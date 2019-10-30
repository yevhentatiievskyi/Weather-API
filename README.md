<h4>
  <img src="https://github.com/yevhentatiievskyi/Weather-API/blob/master/src/assets/logo.png?raw=true" alt="drawing" width="25"/>
  &nbsp;Weather API Installation Guide  
</h4>

1. Install node modules: 
    ```bash
    npm install
    ```
2. Start faker service:
    ```bash
    cd faker
    node index.js
    ```
3. Start devServer (client):
    ```bash
    npm run serve
    ```
Note: 
- constant variables are set in the `configs.js` files of the `configs` and `faker` directories;
- to request the weather information by chosen city the `Open Weather API` service was used (https://openweathermap.org/api).