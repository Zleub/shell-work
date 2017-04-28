```bash
mkdir test0
chmod g-r test0
(OSX) touch -t 03012047 test0

echo 'abc' > test1
chmod u+x,g+x-r test1
(OSX) touch -t 03012146 test1

mkdir test2
chmod u-w,g-rx,o-x test2
(OSX) touch -t 03012245 test2

echo '' > test3
chmod u-w,g-r test3
touch -t 03012344 test3

echo -n '42' > test4
chmod o-r+x test4
touch -t 03012343 test4

ln test3 test5

ln -s test0 test6
touch -h -t 03012220 test6
```
