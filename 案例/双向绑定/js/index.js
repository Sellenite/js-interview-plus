function Vue (options) {
    var self = this;
    this.data = options.data;
    this.methods = options.methods;

    // 这一步的目的是时vm.xx拿到data里的数据，例如这里的例子，就是为了拿到this.title
    Object.keys(this.data).forEach(function (key) {
        self.proxyKeys(key);
    });

    // 劫持data里的所有属性，添加订阅
    observe(this.data);
    // 编译模板
    new Compile(options.el, this);
    // 所有事情处理好后执行mounted函数
    options.mounted.call(this); 
}

Vue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            },
        });
    },
};
