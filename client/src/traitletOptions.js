const traitletOptions = {
    //hex is the colour code, this will be used to show the user the colour of the bead
    //if the bead has a unique texture, you can also write the path to an image of the bead --> images/{imageName.imageid} -- ex: images/testPic.png

    "base-beads": [
        {
            "id":"black-wood",
            "name":"Black Wood",
            "hex":"#241e1f",
            "image":"/images/black-wood.png",
        },
        {
            "id":"white-pearl2",
            "name":"White Pearl",
            "image":"./images/white-pearl2.png",
        },
    ],
    "accessory-beads": [
        {
            "id":"blue-glass",
            "name":"Blue Glass",
            "hex":"#3c6cdc",
            "image":"/images/blue-glass.png",
        },
        {
            "id":"yellow-glass",
            "name":"Yellow Glass",
            "hex":"#ebc304",
            "image":"/images/yellow-glass.png",
        },
        {
            "id":"craked-red-glass",
            "name":"Cracked Red Glass",
            "hex":"#df444a",
            "image":"./images/red-cracked.png",
        },
        {
            "id":"craked-black-glass",
            "name":"Cracked Black Glass",
            "hex":"#5d5f62",
            "image":"/images/black-cracked.png",
        },
        {
            "id":"brown-jasper",
            "name":"Brown Jasper",
            "hex":"#bc8457",
            "image":"./images/brown-jasper.png",
        },
        {
            "id":"purple-cracked",
            "name":"Cracked Purple Glass",
            "hex":"#b259c2",
            "image":"./images/purple_cracked.png",
        },
        {
            "id":"rose-quartz",
            "name":"Rose Quartz",
            "hex":"#dcb5b5",
            "image":"./images/rose-quartz.png",
        },
        {
            "id":"white-pearl",
            "name":"White Pearl",
            "hex":"#e7ebe8",
            "image":"./images/white-pearl.png",
        },
        {
            "id":"green-jade",
            "name":"Green Jade",
            "hex":"#e7ebe8",
            "image":"./images/green-jade.png",
        },

    ],
    "centerpiece": [
        //may require specific image sizes
        {
            "id":"ballet_shoes",
            "name":"Ballet Shoes",
            "image":"./images/unedited-traitlet-icons/ballet_shoes.png",
        },
        {
            "id":"basketball",
            "name":"Basketball",
            "image":"./images/unedited-traitlet-icons/Basketball.png",
        },
        {
            "id":"cross_skis",
            "name":"Cross Skis",
            "image":"./images/unedited-traitlet-icons/Cross_skis.png",
        },
        {
            "id":"cross",
            "name":"Cross",
            "image":"./images/unedited-traitlet-icons/Cross.png",
        },
        {
            "id":"euphonium",
            "name":"Euphonium",
            "image":"./images/unedited-traitlet-icons/Euphonium.png",
        },
        {
            "id":"football",
            "name":"Football",
            "image":"./images/unedited-traitlet-icons/Football.png",
        },
        {
            "id":"guitar",
            "name":"Guitar",
            "image":"./images/unedited-traitlet-icons/Guitar.png",
        },
        {
            "id":"solid_hear",
            "name":"Solid Heart",
            "image":"./images/unedited-traitlet-icons/Heart_solid.png",
        },     
        {
            "id":"heartbeat",
            "name":"Heartbeat",
            "image":"./images/unedited-traitlet-icons/Heartbeat.png",
        },
        {
            "id":"infinity_heart",
            "name":"Infinity Heart",
            "image":"./images/unedited-traitlet-icons/Infinity_heart.png",
        },
        {
            "id":"music_notes",
            "name":"Music Notes",
            "image":"./images/unedited-traitlet-icons/Music_notes.png",
        },
        {
            "id":"penguin_scarf",
            "name":"Penguin Scarf",
            "image":"./images/unedited-traitlet-icons/penguin_scarf.png",
        },
        {
            "id":"snowboard",
            "name":"Snowboard",
            "image":"./images/unedited-traitlet-icons/snowboard.png",
        },
        {
            "id":"soccer",
            "name":"Soccer Ball",
            "image":"./images/unedited-traitlet-icons/soccer_ball.png",
        },
        {
            "id":"spread_love",
            "name":"Spread Love",
            "image":"./images/unedited-traitlet-icons/spread_love.png",
        },
        {
            "id":"traitlet logo",
            "name":"Traitlet Logo",
            "image":"./images/unedited-traitlet-icons/traitlets_logo.png",
        },
        {
            "id":"trebleclef",
            "name":"Trebleclef",
            "image":"./images/unedited-traitlet-icons/Trebleclef.png",
        },
        {
            "id":"trombone",
            "name":"Trombone",
            "image":"./images/unedited-traitlet-icons/Trombone.png",
        },
        {
            "id":"trumpet",
            "name":"Trumpet",
            "image":"./images/unedited-traitlet-icons/Trumpet.png",
        },
    ],
    "size": [
        {"name":'XS', "size":'16 cm'},
        {"name":'S', "size":'16.5 cm'},
        {"name":'M', "size":'18 cm'},
        {"name":'L', "size":'20 cm'},
        {"name":'XL', "size":'21 cm'},
    ]
}

export default traitletOptions
  
// orderInformation = {
//     id:,
//     date:,
//     clientInfo: {
//         name:,
//         email:,
//         phoneNumber:,
//         shippingDetails:{
//             address:,
//             city:,
//             province:,
//             country:,
//         }
    // braceletDetails:{
    //     base-beads:,
    //     accessory-beads:,
    //     centrpiece:{
    //         front-side:{
    //             type:,
    //             design:
    //         }
    //         back-side:{
    //             type:,
    //             design:
    //         }
    //     },
    //     size:
    // }
    // }
// }