# SIMPLE_MERN_SHORT_DEMO_ELASTICSEARCH

It's a simple example or demo project to show Search Operations
it's made by using following technologies

- ReactJS
- NodeJS
- MongoDB
- ExpressJS
- MaterialUI

## How To Run

```
- ElasticSearch
    curl -fsSL https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
    echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
    sudo apt update
    sudo apt install elasticsearch

    configure ElasticSearch
        Firstly, Open /etc/elasticsearch/elasticsearch.yml in your nano editor using the command below:

        sudo nano /etc/elasticsearch/elasticsearch.yml
        Your network settings should be:

        # Set the bind address to a specific IP (IPv4 or IPv6):
        #
        network.host: 127.0.0.1
        #
        # Set a custom port for HTTP:
        #
        http.port: 9200


    sudo systemctl start elasticsearch
    sudo systemctl enable elasticsearch


    sudo apt-get install kibana
    sudo systemctl start kibana.service

    access kibana on Web
    http://localhost:5601/ 

- Server
    1. Move To Server Directory
    cd server/

    2. Install Packages
    yarn

    3. start Server App
    nodemon src/server.js

- Client

    1. Move To Client Directory
    cd Client/

    2. Install Packages
    yarn

    3. start Server App
    yarn start
```
