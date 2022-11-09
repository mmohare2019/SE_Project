import { StyleSheet } from "react-native";
export default StyleSheet.create({
    logo:{width:200,height:200,},
    container:{justifyContent:'center', alignItems:'center'},
    groupView:{ marginTop:30,marginLeft:10,marginRight:10},
    label:{paddingTop:10,fontSize:16,},
    input:{borderWidth: 1,borderRadius: 10,padding: 10,},
    formButton:{
        marginRight:5,marginLeft:5,marginTop:10,
        paddingTop:10,paddingBottom:10,backgroundColor:'green',
        borderRadius:10,borderWidth: 1,borderColor: 'black'
    },
    formButtonText:{
        color:'white',textAlign:'center',fontSize:20,
            paddingLeft: 10,paddingRight: 10},
});
    