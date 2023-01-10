//#########################################
// # Copyright (C) 2022-2023, ASoft JSC. All Rights Reserved.
// #
// # History：
// Date Time Updated Content
// # 09/01/2023 Hoàng Long Tạo mới
///#########################################
import React , {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Alert
} from "react-native";
import axios from 'axios';

// < summary>
/// Class chính chức các phương thức goi api và xây dựng giao diện
/// < /summary>
  export default function App() {

  // < summary>URL của ứng dụng</summary>
  var urlFetch = 'http://localhost:5237/v1/api/NhanVien/';

  /// < summary>Trạng thái các biến< /summary>
  const [list,setList] = useState([]);
  const [visible,setVisible] = useState(false);

  const [id,setId] = useState("");
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [tel,setTel] = useState("");
  const [isValidEmail,setValidEmail] =useState(true);
  const [isValidPhone,setValidPhone] =useState(true);

  /// < summary>regex email và sđt< /summary>
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexTel = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  /// < summary>Trức khi chay, gán 1 biến rỗng< /summary>
  useEffect(()=>{
      fetchData();
  },[])
    
    ///< summary>Gọi request để xem danh sách< /summary>
    /// < param name="fetch">phương thức gọi API< /param>
    /// < returns>trả lại giá trị json< /returns>
    /// < remarks>
    /// method GET: lấy dư liệu
    /// headers: 'Content-Type': 'application/json' : định nghĩa trả về kiều json
    /// < /remarks>
    ///< history>
    /// Hoàng Long Created 09/01/2023
    ///< /history>
    const fetchData= async() => {

            fetch(urlFetch,{
                    method : "GET",
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json', 
                    },
                }).then(res=>{
                    return res.json();
                }).then(resJson=>{
                    console.log('list',resJson)
                    setList(resJson)
                })
                .catch(err=>{
                    console.log(err)
                })
          } 

    ///< summary>Phương thức xóa</summary>
    /// < param name="fetch">phương thức gọi API< /param>
    /// < returns>trả lại giá trị json< /returns>
    /// < remarks>
    /// method GET: lấy dư liệu
    /// headers: 'Content-Type': 'application/json' : định nghĩa trả về kiều json
    /// < /remarks>
    ///< history>
    /// Hoàng Long Created 09/01/2023
    ///< /history>
    const handleDelete = (item) =>{
        { 
                fetch(
                    "http://localhost:5237/v1/api/NhanVien/" + item.id,{
                    method : "DELETE",
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json', 
                    },    
                }).then(res=>{
                    return res.json();
                }).then(res=>{
                    console.log(res)
                    fetchData();
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }

    ///< summary>Phương thức lấy thông tin vào form</summary>
    /// < returns>trả lại giá trị json< /returns>
    /// < remarks>
    /// setVisible(true): mở form nhập
    /// < /remarks>
    ///< history>
    /// Hoàng Long Created 09/01/2023
    ///< /history>
    const handleEdit = (item) => {
        setVisible(true);
        setId(item.id);
        setUserName(item.userName);
        setPassword(item.password);
        setEmail(item.email);
        setTel(item.tel);
    }

    ///< summary>Xửa lý khi nhấn nút lưu: thêm mới khi id= null, sửa khi id có giá trị sẵn</summary>
    /// < param name="fetch">phương thức gọi API< /param>
    /// < returns>trả lại giá trị json< /returns>
    /// < remarks>
    /// method GET: lấy dư liệu
    /// headers: 'Content-Type': 'application/json' : định nghĩa trả về kiều json
    /// < /remarks>
    ///< history>
    /// Hoàng Long Created 09/01/2023
    ///< /history>
    const handelSave = (item) => { 
      if(id==null){
        fetch(urlFetch,{
            method : "POST",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json', 
            },
            body : JSON.stringify({
                "id": id,
                "userName": userName,
                "password": password,
                "email": email,
                "tel": tel
            })
        }).then(res=>{
            return res.json();
        }).then(res=>{
            fetchData();
            handleVisibleModal(false);
            clearForm();
        })
        .catch(err=>{
            console.log(err)
        })
        }
        else{
            fetch( "http://localhost:5237/v1/api/NhanVien/" + item.id,{
            method : "PUT",
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json', 
            },
            body : JSON.stringify({
                "id": id,
                "userName": userName,
                "password": password,
                "email": email,
                "tel": tel
            })
        }).then(res=>{
            return res.json();
        }).then(res=>{
            fetchData();
            handleVisibleModal(false);
            clearForm();
        })
        .catch(err=>{
            console.log(err)
        })
        }
    }

    ///< summary>Làm rỗng các giá trị của modal sau khi thêm xong</summary>
  const clearForm=() => {
        setId("");
        setUserName("");
        setPassword("");
        setEmail("");
        setTel("");
  }

  ///< summary>Sự kiện đóng mở modal</summary>
  const handleVisibleModal = () => {
    setVisible(!visible)
    setId(null)
  }

  ///< summary>Sự kiện nhập thông tin trường id</summary>
  const onChangeId = (value) => {
    setId(value)
  }

  ///< summary>Sự kiện nhập thông tin trường name</summary>
  const onChangeName = (value) => {
    setUserName(value)
  }

  ///< summary>Sự kiện nhập thông tin trường password</summary>
  const onChangePass = (value) => {
    setPassword(value)
  }

  ///< summary>Set sự kiện nhập cho trường email</summary>
  const verifyEmail = (email) => {
    let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    if(!email) return true;
    if(regexEmail.test(email)){
     return true;
    }
    return false;
   }

   ///< summary>Sự kiện nhập thông tin trường tel</summary>
  const onChangeEmail = (value) => {
    setEmail(value)
  }
 
  ///< summary>Set sự kiện nhập cho trường email</summary>
  const verifyPhone = (tel) => {
    let regexTel = new RegExp(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)
    if(!tel) return true;
    if(regexTel.test(tel)){
     return true;
    }
    return false;
   }

   ///< summary>Sự kiện nhập thông tin trường tel</summary>
  const onChangeTel = (value) => {
    setTel(value)
  }

  return (
    ///< summary>Viết giao diện mobile</summary>
    <SafeAreaView>
      <View style={styles.header_container}>
          <TouchableOpacity onPress={handleVisibleModal}>
            <Text style={styles.txt_name}>Thêm nhân viên mới</Text>
          </TouchableOpacity>
      </View>
      
      {/* Sự kiện của modal */}
            <Modal
                animationType="slide"
                visible={visible}
            >
              <SafeAreaView>
                <View style={styles.form}>
                    {/* Nút close */}
                    <TouchableOpacity
                        onPress={handleVisibleModal}
                    >
                        <Text style={styles.txtClose}>
                            Close
                        </Text>
                    </TouchableOpacity>
                    {/* Trường nhập id */}
                    <TextInput
                        value={id}
                        onChangeText={onChangeId}
                        style={styles.text_input}
                        placeholder="Mã nhân viên"
                    />
                    {/* trường nhập tên */}
                    <TextInput
                        value={userName}
                        onChangeText={onChangeName}
                        style={styles.text_input}
                        placeholder="Tên nhân viên"
                    />
                    {/* trường nhập pass */}
                    <TextInput
                        value={password}
                        onChangeText={onChangePass}
                        style={styles.text_input}
                        placeholder="Password"
                    />
                    {/* trường nhập email */}
                    <TextInput
                        onChangeText={(text) => {
                            onChangeEmail(text);
                            const isValid = verifyEmail(text);
                            isValid? setValidEmail(true): setValidEmail(false)
                        }}
                        value={email}
                        style={styles.text_input}
                        placeholder="Email"
                    />
                    <Text style={{padding :10, fontSize:10,color:'red'}}>{isValidEmail?'':'Định dạng email không hợp lệ!'}</Text>
                    {/* trường nhập sđt */}
                    <TextInput
                        value={tel}
                        onChangeText={
                            (text) => {
                                onChangeTel(text);
                                const isValid = verifyPhone(text);
                                isValid? setValidPhone(true): setValidPhone(false)
                            }
                        }
                        style={styles.text_input}
                        placeholder="Số điện thoại"
                    />
                    <Text style={{padding :10, fontSize:10,color:'red'}}>{isValidPhone?'':'Định dạng số điện thoại không hợp lệ!'}</Text>

                    {/* nút thêm hoặc update khi so sánh giá trị id */}
                    <TouchableOpacity
                        onPress={handelSave}
                        style={styles.btnContainer}
                    >
                        <Text style={styles.textButton}>
                            {id == null ? "Save" : "Update"}
                        </Text>
                    </TouchableOpacity>
                </View>
                </SafeAreaView>
            </Modal>

            {/* Render data */}
            <ScrollView>
                   {list.map((item,index)=>{
                    return(
                      <View style={styles.item_course} key={index}>
                        <View>
                          <Text style={styles.txt_id}>Mã nhân viên : {item.id}</Text>
                          <Text style={styles.txt_name}>Tên nhân viên: {item.userName}</Text>
                          <Text style={styles.txt_item}>Mật khẩu: {item.password}</Text>
                          <Text style={styles.txt_item}>Email      :{item.email}</Text>
                          <Text style={styles.txt_item}>SĐT        :{item.tel}</Text>
                        </View>

                        {/* Nút sửa và xoá */}
                        <View>
                                <TouchableOpacity
                                    onPress={()=>handleDelete(item)}
                                >
                                <Text style={styles.txt_del}>XOÁ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>handleEdit(item)}
                                >
                                    <Text style={styles.txt_edit}>SỬA</Text>
                                </TouchableOpacity>
                            </View>
                      </View>
                    )
                   })}       
            </ScrollView>
    </SafeAreaView>
  );
}

///< summary>Viết styles cho ứng dụng</summary>
///< history>
/// Hoàng Long Created 09/01/2023
///< /history>
const styles = StyleSheet.create({
   
  form:{
      padding : 15,
      marginTop:10
  },
 
  txtClose:{
      fontSize:18,
      fontWeight : "bold",
      marginVertical : 10,
      textAlign : "right"
  },
  text_input:{
      padding :10,
      borderWidth :1,
      borderColor : "gray",
      borderRadius : 10,
      marginTop :10
  },
  header_container : {
      padding : 15,
      backgroundColor : "#eeeeee",
      flexDirection:"row",
      justifyContent : "space-between"
  },
  txt_main : {
      fontSize : 22,
      fontWeight : "bold"
  },
  item_course : {
      padding :15,
      borderBottomWidth: 1,
      borderBottomColor : "#e2e2e2",
      flexDirection : "row",
      justifyContent:"space-between"
  },
  txt_id : {
    fontSize : 18,
    marginTop : 5,
    fontWeight : "bold"
  },
  txt_name : {
      fontSize : 18,
      marginTop : 5,
      fontWeight : "bold"
  },
  txt_item : {
      fontSize : 14,
      marginTop : 5
  },
  txt_enabled : {
      fontSize : 14,
      marginTop : 5,
      color:"green",
      fontWeight : "bold"
  },
  txt_disabled : {
      fontSize : 14,
      marginTop : 5,
      color:"yellow",
      fontWeight : "bold"
  },
  txt_del:{
      fontSize : 14,
      marginTop : 5,
      color:"red",
      fontWeight : "bold"
  },
  txt_edit:{
      fontSize : 14,
      marginTop : 5,
      color:"blue",
      fontWeight : "bold"
  },
  btnContainer : {
      display : 'flex',
      padding :20,
      backgroundColor : "#000",
      marginTop : 20,
      
  },
  textButton : {
      textAlign : "center",
      color : "#FFF"
  },
})