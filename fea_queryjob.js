async function runtest(testcase) {
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = await new webdriver.Builder()
    .forBrowser('chrome')
    .build();

await driver.get('https://www.vietnamworks.com/');
  
await driver.findElement(By.name('keyword')).sendKeys(testcase);
await driver.findElement(By.className('button searchBar__button')).click();
let isExistJob
const elements = await driver.findElements(By.className('block-job-list'))
if(elements.length === 1) isExistJob = true
else isExistJob = false
await driver.quit();
return isExistJob
// driver.sleep(2000).then(function() {
//       var isExistJob = {}
//       driver.findElements(By.className('block-job-list')).then(elements => {
//         console.log(elements.length)
//         if(elements.length === 1) isExistJob = true
//         else isExistJob = false
//       })
//       .then(
//         ()=> {
//           console.log(isExistJob)
//           if (isExistJob === true) console.log("Passed")
//           else console.log("Failed")
//           driver.quit();
//           return isExistJob
//         }
//       );
//   });
}

async function main() {
  let fs = require('fs');
  const delay = require('delay')
  let data = fs.readFileSync('input.txt', 'utf8')
  // split the contents by new line
  const lines = data.split(/\r?\n/);

  let testcase = []
  // print all lines
  lines.forEach((line) => {
    testcase.push(line)
  });

  let result = []
  for (let i=0;i<testcase.length;i++){
    let data = await runtest(testcase[i].toString())
    console.log(data)
    result.push(data)
  }
  console.log(result)

  let output = fs.readFileSync('output.txt', 'utf8')
  // split the contents by new line
  const lines_ = output.split(/\r?\n/);

  let outputs = []
  // print all lines
  lines_.forEach((line) => {
    outputs.push(line)
  });

  //console.log(outputs)
  fs.writeFile('result.txt',``, function (err) {
    if (err) {
      // append failed
    } else {
      // done
    }
  })
  for (let i=0;i<outputs.length;i++){
    if(outputs[i]===result[i].toString()) {
      fs.appendFile('result.txt',`TC-001-00${i+1}: Passed \n`, function (err) {
        if (err) {
          // append failed
        } else {
          // done
        }
      })
    }
    else fs.appendFile('result.txt',`TC-001-00${i+1}: Failed \n`,(error)=>function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })
  }
  fs = require('fs').promises;
  const last_result = await fs.readFile('result.txt', "utf8");
  console.log(last_result)
return last_result
}

main()