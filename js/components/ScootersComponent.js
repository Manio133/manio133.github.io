
let ScootersComponent = (function () {

    let statusComponent = StatusComponent(new ScooterStatusModel());
    let countriesComponent = CountriesComponent();

    let StateType = Aggregator.StateType;

    function ScootersComponent(vueModel) {
        let _this = this;

        VueModelInitial(vueModel);

        let countriesComponentObj = new countriesComponent(vueModel);
        let statusComponentObj = new statusComponent(vueModel);

        this.countriesComponentObj = countriesComponentObj;
        this.statusComponentObj = statusComponentObj;

        countriesComponentObj.Callback = function (country, city) {
            _this.Filter();
        }

        statusComponentObj.Callback = function (inStatus) {
            _this.Filter();
        }

        this.model = vueModel;
    }

    ScootersComponent.prototype.Filter = function()
    {

    }

    return ScootersComponent;
})();