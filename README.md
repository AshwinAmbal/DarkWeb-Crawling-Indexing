# DarkWeb Crawler and Indexer
A basic scrapper made in python with BeautifulSoup and Tor support to - 

* Scrape Onion and normal links.
* Save the output in html format in Output folder.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* You will need **Python3** to run this project smoothly. Go to your terminal and execute the following command or visit [Python3](https://www.python.org/download/releases/3.0/) website.

```
[sudo] apt-get install python3 python3-dev
```

* You can install **Tor** by going to their website - https://www.torproject.org/

* Furthermore install the **requirements.txt** using pip3 - 

```
[sudo] pip3 install -r requirements.txt
```

TL;DR: We recommend installing oursystem inside a **virtual environment** on all platforms.

Python packages can be installed either globally (a.k.a system wide), or in user-space. We do not recommend installing TorScrapper system wide.

Instead, we recommend that you install our system within a so-called “virtual environment” (virtualenv). Virtualenvs allow you to not conflict with already-installed Python system packages (which could break some of your system tools and scripts), and still install packages normally with pip (without sudo and the likes).

To get started with virtual environments, see virtualenv installation instructions. To install it globally (having it globally installed actually helps here), it should be a matter of running:

```
[sudo] pip install virtualenv
```
## Basic setup
Before you run the torBot make sure the following things are done properly:

* Run tor service
`sudo service tor start`

* Set a password for tor
`tor --hash-password "my_password" `

* Give the password inside /Modules/Scrape.py
`from stem.control import Controller
with Controller.from_port(port = 9051) as controller:
 controller.authenticate("your_password_hash")
 controller.signal(Signal.NEWNYM)`

* Go to /etc/tor/torrc and uncomment - _**ControlPort 9051**_

Read more about torrc here : [Torrc](https://github.com/ConanKapoor/TorScrapper/blob/master/Tor.md)

### Deployment

A step by step series of examples that tells what you have to do to get this project running -

* Enter the project directory.
* Copy all the onion and normal links you want to scrape in _onions.txt_

```
[nano]/[vim]/[gedit]/[Your choice of editor] onions.txt
```

* Run TorScrapper.py using Python3

```
[sudo] python3 TorScrapper.py
```

* Check the scraped outputs in Output folder. Look into the codebase and you can edit where to save your files. Currently, it saves into a folder named hacking because the links given are related to that and hence that directory needs to be created beforehand too.

* The code saves one file for each domain and strips out subdomain html text and appends it to the same file which is under the name of the domain.

* The code employs BFS by using a queue to visit related urls from the seed url and a file crawled.txt is maintained for each folder so that same links aren't called again.


## Built With

* [Python](https://www.python.org/) - Python programming language.
* [Tor](https://www.torproject.org/) - If you don't know about Tor then you probably shouldn't be here :)


## Authors

* **Ashwin Karthik Ambalavanan**
* **Aditya Vikram Sharma**
* **Jerold Jacob**
* **Mohanraam Sethuraman**
* **Paul Simerda**


