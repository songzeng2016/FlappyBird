// es6面向对象与继承
class Animal {

    constructor(name = '无姓名', age = 0) {
        this.name = name;
        this.age = age;
    }

    say() {
        console.log(this.name, this.age);
    }

}

class Cat extends Animal {

    constructor(name, age) {
        super(name, age);
    }

    say() {
        super.say(); // 调用父类的 say 方法
        console.log('这是子类的名字');
    }

}

const cat = new Cat('小猫哈哈', 2);
cat.say();