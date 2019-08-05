var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_React$Component) {
  _inherits(Application, _React$Component);

  function Application(props) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));

    console.log(_this.getOeuvres());
    return _this;
  }

  _createClass(Application, [{
    key: "getOeuvres",
    value: function getOeuvres() {
      if (typeof this.oeuvres !== 'undefined') {
        return this.oeuvres;
      } else {
        $.ajax({
          url: "/oeuvres",
          success: function success(result) {
            oeuvres = result;
            console.log(result);

            this.oeuvres = result;
            document.getElementsByClassName("nom-oeuvre")[0].innerHTML = result[1][0];
            document.getElementsByClassName("contenu-dimension")[0].innerHTML = result[1][9];
          }
        });
      }
    }
  }, {
    key: "renderOeuvre",
    value: function renderOeuvre() {
      return React.createElement(Oeuvre, {
        nom: "Nom oeuvre"
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "section",
        { className: "application" },
        this.renderOeuvre(),
        React.createElement(
          "footer",
          null,
          React.createElement(
            "div",
            { className: "goto" },
            "#"
          ),
          React.createElement(
            "div",
            { className: "hasard" },
            "?"
          ),
          React.createElement(
            "div",
            { className: "partager" },
            "partager"
          )
        )
      );
    }
  }]);

  return Application;
}(React.Component);