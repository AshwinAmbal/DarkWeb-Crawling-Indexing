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

* A folder is created for each of the seed urls and all the related URLs are added to it


## Built With

* [Python](https://www.python.org/) - Python programming language.
* [Tor](https://www.torproject.org/) - If you don't know about Tor then you probably shouldn't be here :)

## Indexing with Apache Solr-8.0.0

## Pre-requirements

* Download the latest release of ***Apache Solr*** from Solr Website (https://lucene.apache.org/solr/mirrors-solr-latest-redir.html).

* `solr-8.0.0.tgz` for Linux/Unix/OSX systems
* `solr-0.0.0.zip` for Microsoft Windows systems

## Basic Installation Setup and Commands

* Extract the Solr distribution archive to local home directory using the following commands in the Terminal.

* For Linux,

```
cd ~/
tar zxf solr-8.0.0.tgz
```

Once extracted, Apache Solr is now ready to run by following the instructions given below.

* To start solr, the following command can be used

```
[To the directory of Apache Solr-8.0.0] bin/solr start 
```

* This will start Solr in the background, listening on port 8983. You can use a Web browser to see the Admin Console. `http://localhost:8983/solr/`

* To check the status of solr, the following command can be used

```
[To the directory of Apache Solr-8.0.0] bin/solr status 
```

* To stop solr, the following command can be used

```
[To the directory of Apache Solr-8.0.0] bin/solr stop 
```

## Indexing the crawled files

Following step-by-step instructions will help you to index the crawled files.

* Start Solr as a two-node Cluster and create a collection on the startup called **crawled** to store the indexed files on Solr. Press `Enter` key to follow the default setup.

```
solr-8.0.0:$ ./bin/solr start -e cloud

To begin, how many Solr nodes would you like to run in your local cluster? (specify 1-4 nodes) [2]:[Enter]
Ok, let's start up 2 Solr nodes for your example SolrCloud cluster.
Please enter the port for node1 [8983]:[Press Enter]
Please enter the port for node2 [7574]:[Press Enter]

Now let's create a new collection for indexing documents in your 2-node cluster.
Please provide a name for your new collection: [gettingstarted]
[enter your desired collection name. The name we have used here is **crawled**]
```

* To index the data, enter the required number of shards to split and the replicas needed per shard. Default is 1 if Ubuntu is used as a Virtual Machine or else 2.
* Choose the configration file for **crawled** collection. Default is *_default*.

```
How many shards would you like to split techproducts into? [2]
How many replicas per shard would you like to create? [2]
Please choose a configuration for the techproducts collection, available options are:
_default or sample_techproducts_configs [_default] 
[Press Enter]
```

* Eventually, You can see that the Apache Solr has been started and you can verify it by launching the Solr Admin UI in your web browser: http://localhost:8983/solr/.

* To index the crawled files, use the following command.

```
solr-8.0.0:$ bin/post -c crawled [path_where_the_crawled_files_are_stored]/*
```

* When the above command is executed, all the files in the given location would have been successfully indexed and the output will be similar to the following:

```
SimplePostTool version 5.0.0
Posting files to [base] url http://localhost:8983/solr/crawled/update...
Entering auto mode. File endings considered are xml,json,jsonl,csv,pdf,doc,docx,ppt,pptx,xls,xlsx,odt,odp,ods,ott,otp,ots,rtf,htm,html,txt,log
POSTing file [filename_1].html (text/html) to [base]
POSTing file [filename_2].html (text/html) to [base]
POSTing file [filename_3].html (text/html) to [base]
POSTing file [filename_4].html (text/html) to [base]
.....

[Total_number_of_files] files indexed.
COMMITting Solr index changes to http://localhost:8983/solr/crawled/update...
Time spent:
```
* Now, the data is stored in Solr and this can be verified by typing your search term into the *query* section of *Solr Admin UI console*.

## Post Indexing - Start the Web page

* Start the Apache Solr by using the above mentioned instructions.

* Once the indexing of files has been done, run the **try.html** file in localhost and start searching. The results of the query will be retrieved from solr and displayed on the web page.

`NOTE:` If any CORS Error occurs during the searching process in the Chrome browser, add CORS extension to the browser.  

## Authors

* **Ashwin Karthik Ambalavanan**
* **Aditya Vikram Sharma**
* **Jerold Jacob Thomas**
* **Mohanraam Sethuraman**
* **Paul Simerda**


