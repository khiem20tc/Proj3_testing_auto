const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
driver.get('https://www.google.com');
driver.get('https://secure.vietnamworks.com/login/en?client_id=3&utm_source=&utm_medium=Header');

driver.findElement(By.name('username')).sendKeys('anh.huynh0209@outlook.com');
driver.findElement(By.name('password')).sendKeys('0209.prtsC');
driver.findElement(By.id('button-login')).click();

driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      console.log(title)
      if(title === 'VietnamWorks Account') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
      driver.quit();
    });
  });

// Conclude a test
//driver.quit();