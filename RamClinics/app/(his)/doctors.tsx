import { Pressable, Text, View } from "react-native";
import { useEffect } from "react";
import userService from "../../domain/services/UserService";
import { useCountStore } from "../../domain/state/counter";

const HISHome = () => {

    // let [users, setUsers]= useState([]);

    // let count  = useCountStore.getState().count;
    // let setUsers  = useCountStore.getState().setUsers;

    let {count, users, increase, decrease, setUsers} = useCountStore();

    useEffect(() => {
        userService.findAll().then( (res) => {        
            setUsers(res.data);
        });
    });
    
    return(
        <View>
            {/* <Text>Docotors List {users.length}</Text> */}
            {/* { users.map(it => <Text>{it?.firstName}</Text>) } */}

            <Text>{count} </Text>


            {/* <Button onPress={() => increase(1)} title="Increse"> </Button>
            <Button onPress={() =>  decrease(1)} title="Decrese"> </Button> */}

            <Pressable onPress={() => increase(1)}>
                <Text>Increase</Text>
            </Pressable>

            <Pressable onPress={() => decrease(1)}>
                <Text>Decrease</Text>
            </Pressable>

        </View>
    )
}

export default HISHome;