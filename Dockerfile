FROM 1and1internet/debian-9
MAINTAINER brian.wilkinson@1and1.co.uk
COPY files/ /
RUN export DEBIAN_FRONTEND=noninteractive DEBCONF_NONINTERACTIVE_SEEN=true \
	&& apt-get update \
	&& apt-get install -y gnupg openssl \
	&& apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5 \
	&& apt-get update \
	&& apt-get install -y mongodb-org \
	&& apt-get remove gnupg \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/* \
	&& mkdir -p /var/log/mongodb \
				/mongoshare \
	&& chmod -R 777 /var/log/mongodb \
					/var/lib/mongodb \
					/etc/supervisor/conf.d \
					/mongoshare \
	&& chmod +x /usr/local/bin/setup_replica \
	&& rm -f ~/.rnd

ENV ADMINUSER=defaultadminuser \
	ADMINPASS=defaultadminpass \
	REPLICA_SET=rs0 \
	MONGO_SHARE=/mongoshare \
	HOME=/mongoshare
