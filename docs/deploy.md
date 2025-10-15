# Deployment Guide

This guide covers deploying the personal site to a self-hosted Ubuntu server with Docker, Nginx, and SSL certificates.

## Prerequisites

- Ubuntu 22.04 LTS server
- Docker and docker-compose installed
- Domain name pointing to your server
- GitHub repository with the code

## Server Setup

### 1. Install Docker and Docker Compose

```bash
# Update package index
sudo apt update

# Install required packages
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Configure Firewall

```bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
```

### 3. Install Nginx (if not using Docker)

```bash
sudo apt install nginx

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## SSL Certificate Setup

### Using Certbot (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d mydomain.tld -d www.mydomain.tld

# Test automatic renewal
sudo certbot renew --dry-run

# Set up automatic renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

### Manual SSL Certificate

If you have your own SSL certificates:

```bash
# Create SSL directory
mkdir -p /path/to/your/project/ssl

# Copy your certificates
cp your-cert.pem /path/to/your/project/ssl/cert.pem
cp your-key.pem /path/to/your/project/ssl/key.pem

# Set proper permissions
chmod 600 /path/to/your/project/ssl/key.pem
chmod 644 /path/to/your/project/ssl/cert.pem
```

## Environment Configuration

### 1. Create Environment File

```bash
# Copy example environment file
cp env.example .env

# Edit with your values
nano .env
```

Required environment variables:

```env
SITE_URL=https://mydomain.tld
SITE_NAME="Your Personal Site"
SITE_DESCRIPTION="Personal site and technical blog"
AUTHOR_NAME="Your Name"
AUTHOR_EMAIL="your.email@example.com"
AUTHOR_TWITTER="@yourhandle"
AUTHOR_GITHUB="yourusername"
GITHUB_URL=https://github.com/yourusername
TWITTER_URL=https://twitter.com/yourhandle
LINKEDIN_URL=https://linkedin.com/in/yourprofile
```

### 2. GitHub Secrets

Configure the following secrets in your GitHub repository:

- `SERVER_HOST`: Your server's IP address or domain
- `SERVER_USER`: SSH username
- `SERVER_SSH_KEY`: Private SSH key for server access
- `SERVER_PORT`: SSH port (usually 22)
- `SITE_URL`: Your site URL
- `AUTHOR_NAME`: Your name
- `AUTHOR_EMAIL`: Your email
- `AUTHOR_TWITTER`: Your Twitter handle
- `AUTHOR_GITHUB`: Your GitHub username
- `GITHUB_URL`: Your GitHub profile URL
- `TWITTER_URL`: Your Twitter profile URL
- `LINKEDIN_URL`: Your LinkedIn profile URL

## Deployment

### 1. Manual Deployment

```bash
# Clone repository
git clone https://github.com/yourusername/personal-site.git
cd personal-site

# Build and start services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Check health
curl http://localhost:3000/api/health
```

### 2. Automated Deployment with GitHub Actions

1. Push your code to the main branch
2. GitHub Actions will automatically:
   - Build the Docker image
   - Push to GitHub Container Registry
   - Deploy to your server
   - Run health checks

### 3. Verify Deployment

```bash
# Check container status
docker-compose ps

# Check logs
docker-compose logs app
docker-compose logs nginx

# Test endpoints
curl http://localhost:3000/api/health
curl https://mydomain.tld
curl https://mydomain.tld/api/health
```

## Monitoring and Maintenance

### 1. Log Monitoring

```bash
# View application logs
docker-compose logs -f app

# View Nginx logs
docker-compose logs -f nginx

# View system logs
sudo journalctl -u docker.service
```

### 2. Health Checks

```bash
# Application health check
curl -f http://localhost:3000/api/health

# Nginx health check
curl -f http://localhost/

# SSL certificate check
openssl s_client -connect mydomain.tld:443 -servername mydomain.tld
```

### 3. Backup

```bash
# Backup application data
tar -czf backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .

# Backup SSL certificates
tar -czf ssl-backup-$(date +%Y%m%d).tar.gz ssl/
```

### 4. Updates

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Clean up old images
docker image prune -f
```

## Troubleshooting

### Common Issues

1. **Container won't start**
   ```bash
   # Check logs
   docker-compose logs app
   
   # Check configuration
   docker-compose config
   ```

2. **SSL certificate issues**
   ```bash
   # Check certificate validity
   openssl x509 -in ssl/cert.pem -text -noout
   
   # Renew certificate
   sudo certbot renew
   ```

3. **Nginx configuration errors**
   ```bash
   # Test Nginx configuration
   nginx -t
   
   # Reload Nginx
   docker-compose restart nginx
   ```

4. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   chmod 600 ssl/key.pem
   chmod 644 ssl/cert.pem
   ```

### Performance Optimization

1. **Enable caching**
   ```bash
   # Add to docker-compose.yml
   volumes:
     - nginx_cache:/var/cache/nginx
   ```

2. **Resource limits**
   ```bash
   # Add to docker-compose.yml
   deploy:
     resources:
       limits:
         memory: 512M
         cpus: '0.5'
   ```

3. **Log rotation**
   ```bash
   # Create logrotate configuration
   sudo nano /etc/logrotate.d/docker-containers
   ```

## Security Considerations

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Regular security scans**
   ```bash
   docker scan ghcr.io/yourusername/personal-site:latest
   ```

3. **Monitor access logs**
   ```bash
   tail -f /var/log/nginx/access.log
   ```

4. **Use strong passwords and SSH keys**
   ```bash
   # Disable password authentication
   sudo nano /etc/ssh/sshd_config
   # PasswordAuthentication no
   sudo systemctl restart ssh
   ```

## Support

For issues and questions:
- Check the logs first
- Review this documentation
- Create an issue in the GitHub repository
- Check the Next.js and Docker documentation
