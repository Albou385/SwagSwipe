#!/bin/bash

# Installation script for auto-update functionality
echo "Starting installation of auto-update functionality..."

# Get the current directory
CURRENT_DIR=$(pwd)

# Create the auto-update script in the current directory
echo "Creating auto-update script in $(pwd)..."
cat > auto-update.sh << 'EOF'
#!/bin/bash

while true; do
    echo "Running git pull at $(date)"
    git pull
    
    echo "Rebuilding docker containers"
    docker-compose up -d --build
    
    echo "Waiting 60 seconds before next update..."
    sleep 60
done
EOF

# Make the script executable
chmod +x auto-update.sh

# Create a service to run the script on system startup
echo "Creating systemd service for auto-update..."
cat > /etc/systemd/system/auto-update.service << EOF
[Unit]
Description=Auto-update Git repository and rebuild Docker containers
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=${CURRENT_DIR}
ExecStart=${CURRENT_DIR}/auto-update.sh
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start the service
systemctl daemon-reload
systemctl enable auto-update.service
systemctl start auto-update.service

echo "Installation complete!"
echo "The auto-update service is now running and will start automatically on system boot."
echo "To check the status, run: systemctl status auto-update.service"
echo "To view logs, run: journalctl -u auto-update.service"