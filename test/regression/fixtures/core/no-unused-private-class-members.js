
class ValidPrivateMembers {
  #privateField = 'private';
  #privateMethod() {
    return this.#privateField;
  }
  
  publicMethod() {
    return this.#privateMethod();
  }
}

class ValidPrivateStatic {
  static #privateStaticField = 'static private';
  static #privateStaticMethod() {
    return ValidPrivateStatic.#privateStaticField;
  }
  
  static publicStaticMethod() {
    return ValidPrivateStatic.#privateStaticMethod();
  }
}

class InvalidUnusedPrivateField {
  #usedPrivateField = 'used';
  #unusedPrivateField = 'unused'; // Error: Private field is never used
  
  getUsedField() {
    return this.#usedPrivateField;
  }
}

class InvalidUnusedPrivateMethod {
  #usedPrivateMethod() {
    return 'used';
  }
  
  #unusedPrivateMethod() { // Error: Private method is never used
    return 'unused';
  }
  
  publicMethod() {
    return this.#usedPrivateMethod();
  }
}

class InvalidUnusedPrivateStatic {
  static #usedStaticField = 'used';
  static #unusedStaticField = 'unused'; // Error: Private static field is never used
  
  static #usedStaticMethod() {
    return InvalidUnusedPrivateStatic.#usedStaticField;
  }
  
  static #unusedStaticMethod() { // Error: Private static method is never used
    return 'unused';
  }
  
  static publicMethod() {
    return InvalidUnusedPrivateStatic.#usedStaticMethod();
  }
}
