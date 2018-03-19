// es5面向对象与继承
(function () {

    // 函数声明（不推荐使用）
    // function Animal() {
    //
    // }

    // 函数表达式
    var Animal = function (name, age) {
        this.name = name;
        this.age = age;
        // this.say = function () {
        //     console.log(this.name + '  ' + this.age);
        // }
    };

    Animal.prototype.say = function () {
        console.log(this.name + '  ' + this.age);
    };

    // var cat = new Animal('小猫', 3);
    // cat.say();
    //
    // // 寄生组合继承
    // // call(), apply()
    // // 调用一个对象的一个方法，用另一个对象替换当前对象
    //
    // // 调用 cat 的 say 方法
    // Animal.prototype.say.call(cat);
    // // Animal.prototype.say.apply(cat);
    //
    // var params = {
    //     name: '小猫2',
    //     age: 4
    // };
    //
    // // 调用cat的say方法，用另params对象替换cat对象
    // cat.say.call(params);  // 小猫2  4

    // 寄生组合继承
    var Cat = function (name, age) {
        // Animal.apply(this, arguments);
        // Animal.apply(this, [name, age]);
        Animal.call(this, name, age);
    };

    // 浅克隆
    Cat.prototype = Object.create(Animal.prototype);
    // 区分
    // Cat.prototype = new Animal();

    Cat.prototype.say = function () {
        var p = {
            name: '父类的名字',
            age: 10
        };
        // 调用父类的 say 方法
        Animal.prototype.say.apply(p);

        console.log('这是子类 ' + this.name + this.age);
    };

    var cat1 = new Cat('子猫', 5);
    cat1.say();

})();