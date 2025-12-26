---
title: "코루틴(Coroutine) vs 쓰레드(Thread)"
description: "코루틴과 쓰레드의 차이를 공부해 봅시다"
date: "2025-12-16"
tags: ["Kotlin", "CS"]
draft: false
lang: "ko"

---

# 코루틴(Coroutine) 빨라빨라

#### 1. 서론: 코루틴을 쓴다고 무조건 빨라지는 건 아니다

많은 개발자가 "비동기 처리를 위해 코루틴을 도입했다"고 말합니다. 하지만 단순히 `launch`를 사용한다고 해서 모든 작업이 마법처럼 빨라지는 것은 아닙니다. 핵심은 **'어떤 스레드에서 실행할 것인가(Dispatcher)'**와 **'여러 작업을 어떻게 동시에 수행할 것인가(Async/Await)'**를 정확히 설계하는 데 있습니다. 오늘은 백엔드 성능 최적화의 열쇠인 이 두 가지 개념을 정리해 봅니다.

#### 2. 적재적소의 스레드 배분: Dispatcher 정복하기

코루틴은 `CoroutineDispatcher`를 통해 실행될 스레드를 결정합니다. 무턱대고 아무 Dispatcher나 쓰면 오히려 성능이 저하될 수 있습니다. 작업의 성격에 맞는 Dispatcher를 골라야 합니다.

- **Dispatchers.IO:** 네트워크 요청이나 DB 조회 같은 **입출력(I/O) 작업**에 최적화되어 있습니다. 대기 시간이 긴 작업들이므로 스레드 풀을 유동적으로 늘려서 처리합니다.
- **Dispatchers.Default:** 데이터 연산, JSON 파싱 등 **CPU 연산 작업**에 적합합니다. 코어 수에 비례하여 스레드를 할당하므로 CPU 자원을 효율적으로 씁니다.
- **심화 팁 (`limitedParallelism`):** 특정 DB나 API에 과도한 요청이 몰리는 것을 막고 싶다면? `Dispatchers.IO.limitedParallelism(10)` 처럼 사용하여 동시 실행 수를 제한할 수 있습니다. 이는 공유 스레드 풀을 오염시키지 않고 격리된 환경을 만드는 고급 기법입니다.

#### 3. `async`와 `await`의 함정: 직렬 vs 병렬

결과값을 받아와야 할 때 `async`를 사용합니다. 하지만 `await()`을 호출하는 시점에 따라 성능은 천차만별이 됩니다.

**❌ 나쁜 예 (직렬 처리):**

Kotlin

```
val result1 = async { task1() }.await() // 1초 소요
val result2 = async { task2() }.await() // 1초 소요
// 총 2초 소요 (순차 실행됨)
```

위 코드는 `async`를 썼음에도 불구하고, 앞선 작업이 끝날 때까지 기다렸다가 다음 작업을 하므로 사실상 동기 코드와 다를 바가 없습니다.

**✅ 좋은 예 (병렬 처리):**

Kotlin

```
val deferred1 = async { task1() }
val deferred2 = async { task2() }
// 두 작업이 동시에 시작됨

val result1 = deferred1.await()
val result2 = deferred2.await()
// 총 1초 소요 (병렬 실행됨)
```

또는 `awaitAll(deferred1, deferred2)`을 사용하면 리스트 형태로 깔끔하게 결과를 한 번에 받을 수 있습니다.

#### 4. 결론: 성능 최적화의 핵심

백엔드 개발자로서 성능을 최적화하고 싶다면 다음 두 가지를 점검해 보세요.

1. **작업의 종류(I/O vs CPU)에 맞는 Dispatcher를 쓰고 있는가?**
2. **독립적인 작업들을 `async`로 묶어 진짜 병렬로 처리하고 있는가?**

이 원칙만 지켜도 응답 속도를 획기적으로 단축할 수 있습니다. 제가 최근 프로젝트에서 리포트 생성 시간을 9초에서 1.5초로 줄일 수 있었던 비결도 바로 이 '병렬 처리'에 있었습니다.