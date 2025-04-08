FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy custom Apache configuration
COPY ./conf/js-no-cache.conf /etc/apache2/conf-available/js-no-cache.conf

# Enable the new configuration
RUN a2enconf js-no-cache

#enable mod rewrite
RUN a2enmod rewrite

# Copy application source
COPY . /var/www/html/

EXPOSE 80
