(function() {
  var extend = function (destination, source) {
    if (!destination || !source) return destination;
    for (var key in source) {
      if (destination[key] !== source[key])
        destination[key] = source[key];
    }
    return destination;
  };
  
  var find = function (root, objectName) {
    var parts = objectName.split('.'),
        part;
    
    while (part = parts.shift()) {
      root = root[part];
      if (root === undefined)
        throw new Error('Cannot find object named ' + objectName);
    }
    return root;
  };
  
  var formatError = function (error) {
    var lines  = error.input.split(/\n/g),
        lineNo = 0,
        offset = 0;
    
    while (offset < error.offset + 1) {
      offset += lines[lineNo].length + 1;
      lineNo += 1;
    }
    var message = 'Line ' + lineNo + ': expected ' + error.expected + '\n',
        line    = lines[lineNo - 1];
    
    message += line + '\n';
    offset  -= line.length + 1;
    
    while (offset < error.offset) {
      message += ' ';
      offset  += 1;
    }
    return message + '^';
  };
  
  var Grammar = {
    __consume__document: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["document"] = this._nodeCache["document"] || {};
      var cached = this._nodeCache["document"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 0, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var index2 = this._offset;
        address1 = this.__consume__doctype();
        if (address1) {
        } else {
          this._offset = index2;
          address1 = this.__consume__text();
          if (address1) {
          } else {
            this._offset = index2;
            address1 = this.__consume__tag();
            if (address1) {
            } else {
              this._offset = index2;
            }
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address0 = new klass0(text0, this._offset, elements0);
        if (typeof type0 === "object") {
          extend(address0, type0);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["document"][index0] = address0;
    },
    __consume__tag: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["tag"] = this._nodeCache["tag"] || {};
      var cached = this._nodeCache["tag"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      address1 = this.__consume__open_tag();
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        labelled0.open_tag = address1;
        var address2 = null;
        var remaining0 = 0, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var index3 = this._offset;
          address3 = this.__consume__text();
          if (address3) {
          } else {
            this._offset = index3;
            address3 = this.__consume__tag();
            if (address3) {
            } else {
              this._offset = index3;
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address2 = new klass0(text1, this._offset, elements1);
          if (typeof type0 === "object") {
            extend(address2, type0);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          address4 = this.__consume__close_tag();
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
            labelled0.close_tag = address4;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address0 = new klass1(text0, this._offset, elements0, labelled0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["tag"][index0] = address0;
    },
    __consume__open_tag: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["open_tag"] = this._nodeCache["open_tag"] || {};
      var cached = this._nodeCache["open_tag"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 1);
      } else {
        slice0 = null;
      }
      if (slice0 === "<") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("<", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 1;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"<\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9a-zA-Z \"'=-]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-zA-Z \\\"'=-]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === ">") {
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3(">", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\">\""};
            }
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = null;
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["open_tag"][index0] = address0;
    },
    __consume__close_tag: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["close_tag"] = this._nodeCache["close_tag"] || {};
      var cached = this._nodeCache["close_tag"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 2);
      } else {
        slice0 = null;
      }
      if (slice0 === "</") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("</", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 2;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"</\""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9a-zA-Z]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-zA-Z]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === ">") {
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3(">", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\">\""};
            }
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = null;
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["close_tag"][index0] = address0;
    },
    __consume__doctype: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["doctype"] = this._nodeCache["doctype"] || {};
      var cached = this._nodeCache["doctype"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var index1 = this._offset, elements0 = [], labelled0 = {}, text0 = "";
      var address1 = null;
      var slice0 = null;
      if (this._input.length > this._offset) {
        slice0 = this._input.substring(this._offset, this._offset + 10);
      } else {
        slice0 = null;
      }
      if (slice0 === "<!DOCTYPE ") {
        var klass0 = this.constructor.SyntaxNode;
        var type0 = null;
        address1 = new klass0("<!DOCTYPE ", this._offset, []);
        if (typeof type0 === "object") {
          extend(address1, type0);
        }
        this._offset += 10;
      } else {
        address1 = null;
        var slice1 = null;
        if (this._input.length > this._offset) {
          slice1 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice1 = null;
        }
        if (!this.error || this.error.offset <= this._offset) {
          this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\"<!DOCTYPE \""};
        }
      }
      if (address1) {
        elements0.push(address1);
        text0 += address1.textValue;
        var address2 = null;
        var remaining0 = 1, index2 = this._offset, elements1 = [], text1 = "", address3 = true;
        while (address3) {
          var slice2 = null;
          if (this._input.length > this._offset) {
            slice2 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice2 = null;
          }
          if (slice2 && /^[0-9a-zA-Z]/.test(slice2)) {
            var klass1 = this.constructor.SyntaxNode;
            var type1 = null;
            address3 = new klass1(slice2, this._offset, []);
            if (typeof type1 === "object") {
              extend(address3, type1);
            }
            this._offset += 1;
          } else {
            address3 = null;
            var slice3 = null;
            if (this._input.length > this._offset) {
              slice3 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice3 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[0-9a-zA-Z]"};
            }
          }
          if (address3) {
            elements1.push(address3);
            text1 += address3.textValue;
            remaining0 -= 1;
          }
        }
        if (remaining0 <= 0) {
          this._offset = index2;
          var klass2 = this.constructor.SyntaxNode;
          var type2 = null;
          address2 = new klass2(text1, this._offset, elements1);
          if (typeof type2 === "object") {
            extend(address2, type2);
          }
          this._offset += text1.length;
        } else {
          address2 = null;
        }
        if (address2) {
          elements0.push(address2);
          text0 += address2.textValue;
          var address4 = null;
          var slice4 = null;
          if (this._input.length > this._offset) {
            slice4 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice4 = null;
          }
          if (slice4 === ">") {
            var klass3 = this.constructor.SyntaxNode;
            var type3 = null;
            address4 = new klass3(">", this._offset, []);
            if (typeof type3 === "object") {
              extend(address4, type3);
            }
            this._offset += 1;
          } else {
            address4 = null;
            var slice5 = null;
            if (this._input.length > this._offset) {
              slice5 = this._input.substring(this._offset, this._offset + 1);
            } else {
              slice5 = null;
            }
            if (!this.error || this.error.offset <= this._offset) {
              this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "\">\""};
            }
          }
          if (address4) {
            elements0.push(address4);
            text0 += address4.textValue;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0) {
        this._offset = index1;
        var klass4 = this.constructor.SyntaxNode;
        var type4 = null;
        address0 = new klass4(text0, this._offset, elements0, labelled0);
        if (typeof type4 === "object") {
          extend(address0, type4);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["doctype"][index0] = address0;
    },
    __consume__text: function(input) {
      var address0 = null, index0 = this._offset;
      this._nodeCache["text"] = this._nodeCache["text"] || {};
      var cached = this._nodeCache["text"][index0];
      if (cached) {
        this._offset += cached.textValue.length;
        return cached;
      }
      var remaining0 = 1, index1 = this._offset, elements0 = [], text0 = "", address1 = true;
      while (address1) {
        var slice0 = null;
        if (this._input.length > this._offset) {
          slice0 = this._input.substring(this._offset, this._offset + 1);
        } else {
          slice0 = null;
        }
        if (slice0 && /^[^<]/.test(slice0)) {
          var klass0 = this.constructor.SyntaxNode;
          var type0 = null;
          address1 = new klass0(slice0, this._offset, []);
          if (typeof type0 === "object") {
            extend(address1, type0);
          }
          this._offset += 1;
        } else {
          address1 = null;
          var slice1 = null;
          if (this._input.length > this._offset) {
            slice1 = this._input.substring(this._offset, this._offset + 1);
          } else {
            slice1 = null;
          }
          if (!this.error || this.error.offset <= this._offset) {
            this.error = this.constructor.lastError = {input: this._input, offset: this._offset, expected: "[^<]"};
          }
        }
        if (address1) {
          elements0.push(address1);
          text0 += address1.textValue;
          remaining0 -= 1;
        }
      }
      if (remaining0 <= 0) {
        this._offset = index1;
        var klass1 = this.constructor.SyntaxNode;
        var type1 = null;
        address0 = new klass1(text0, this._offset, elements0);
        if (typeof type1 === "object") {
          extend(address0, type1);
        }
        this._offset += text0.length;
      } else {
        address0 = null;
      }
      return this._nodeCache["text"][index0] = address0;
    }
  };
  
  var Parser = function(input) {
    this._input = input;
    this._offset = 0;
    this._nodeCache = {};
  };
  
  Parser.prototype.parse = function() {
    var result = this.__consume__document();
    if (result && this._offset === this._input.length) {
      return result;
    }
    if (!(this.error)) {
      this.error = {input: this._input, offset: this._offset, expected: "<EOF>"};
    }
    var message = formatError(this.error);
    var error = new Error(message);
    throw error;
  };
  
  Parser.parse = function(input) {
    var parser = new Parser(input);
    return parser.parse();
  };
  
  extend(Parser.prototype, Grammar);
  
  var SyntaxNode = function(textValue, offset, elements, properties) {
    this.textValue = textValue;
    this.offset    = offset;
    this.elements  = elements || [];
    if (!properties) return;
    for (var key in properties) this[key] = properties[key];
  };
  
  SyntaxNode.prototype.forEach = function(block, context) {
    for (var i = 0, n = this.elements.length; i < n; i++) {
      block.call(context, this.elements[i], i);
    }
  };
  
  Parser.SyntaxNode = SyntaxNode;
  
  if (typeof require === "function" && typeof exports === "object") {
    exports.Grammar = Grammar;
    exports.Parser  = Parser;
    exports.parse   = Parser.parse;
    
  } else {
    var namespace = this;
    HTML = Grammar;
    HTMLParser = Parser;
    HTMLParser.formatError = formatError;
  }
})();

