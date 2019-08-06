var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_React$Component) {
  _inherits(Application, _React$Component);

  function Application(props) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this, props));
    // Initialisation


    _this.state = {
      oeuvres: [],
      state: "init"

      // Chargement des oeuvres
    };_this.state.oeuvres = _this.charger_oeuvres();
    return _this;
  }

  _createClass(Application, [{
    key: "charger_oeuvres",
    value: function charger_oeuvres() {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "/oeuvres",
          success: function success(result) {
            resolve(result);
          },
          error: function error(err) {
            console.error(err);
            reject(err);
          }
        });
      });
    }
  }, {
    key: "render_accueil",
    value: function render_accueil() {
      var _this2 = this;

      return React.createElement(Accueil, {
        onClick: function onClick() {
          return _this2.showApplication();
        }
      });
    }
  }, {
    key: "showApplication",
    value: function showApplication() {
      // Cacher l'accueil
      test = document.getElementsByClassName("acceuil")[0];
      document.getElementsByClassName("acceuil")[0].style.opacity = 0;
    }
  }, {
    key: "renderOeuvre",
    value: function renderOeuvre(index) {
      return React.createElement(Oeuvre, null);
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      return React.createElement(
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
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "section",
        { className: "application" },
        this.render_accueil()
      );
    }
  }]);

  return Application;
}(React.Component);