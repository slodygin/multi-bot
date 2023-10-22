# Быстрый старт
```
git clone ... multi-bot
cd multi-bot
docker-compose up -d --build
```



# Полезные команды
```
#создать/послать/прочитать из kafka
docker-compose exec kafka bash
kafka-topics --bootstrap-server localhost:9092 --topic first_topic --create --partitions 3 --replication-factor 1
kafka-topics --bootstrap-server=localhost:9092 --list
kafka-topics --bootstrap-server=localhost:9092 --describe --topic first_topic
kafka-console-producer --broker-list localhost:9092 --topic first_topic --property "key.separator=-" --property "parse.key=true"
echo "A-apple" |kafka-console-producer --broker-list localhost:9092 --topic first_topic --property "key.separator=-" --property "parse.key=true"
echo "g-grape" |kafka-console-producer --broker-list localhost:9092 --topic first_topic --property "key.separator=-" --property "parse.key=true"
kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic test-topic --from-beginning -property "key.separator= - " --property "print.key=true"
#mongo
docker-compose exec mongodb mongosh
show databases
use coffeechat
db.users.find()
```
