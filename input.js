var testKey =

{
    TC_001 :[
        {
            in:{
                companyName:"",
                location:"ha noi",
                category:"it",
                onRecruit:""
            },
            out:{
                companyName:"fpt",
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
                onRecruit:"",
                nonResult: true
            }
        }
        ,{
            in:{
                companyName:"soft",
                location:"ho chi minh",
                category:"it",
                onRecruit:""
            },
            out:{
                companyName:"soft",
                location:"Hồ Chí Minh",
                category:"IT - Phần mềm",
                onRecruit:"",
                nonResult: true
            }
        }

    ],
    TC_002:{

    }
}

module.exports = testKey;