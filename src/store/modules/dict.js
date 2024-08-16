const useDictStore = defineStore(
  'dict',
  {
    state: () => ({
      dict: new Array()
    }),
    actions: {
      // 获取字典
      getDict(_key) {
        if (!_key) { // 简化判断条件
          return null;
        }
        for (let i = 0; i < this.dict.length; i++) {
          if (this.dict[i].key === _key) { // 使用严格等于
            return this.dict[i].value;
          }
        }
        return null;
      },
      // 设置字典
      setDict(_key, value) {
        if (_key) { // 简化判断条件
          this.dict.push({
            key: _key,
            value: value
          });
        }
      },
      // 删除字典
      removeDict(_key) {
        let isFound = false;
        for (let i = 0; i < this.dict.length; i++) {
          if (this.dict[i].key === _key) { // 使用严格等于
            this.dict.splice(i, 1);
            isFound = true;
            break; // 找到并删除后退出循环
          }
        }
        return isFound;
      },
      // 清空字典
      cleanDict() {
        this.dict = []; // 使用数组字面量更简洁
      },
      // 初始字典
      initDict() {
        // 假设初始化为一个特定的字典对象或清空，这里以清空为例
        this.dict = [];
      }
    }
  }
)

export default useDictStore