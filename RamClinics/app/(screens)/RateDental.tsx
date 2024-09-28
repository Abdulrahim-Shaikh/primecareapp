import { Button, Text, TextInput, View } from "react-native"
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton"

const RateDental = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <HeaderWithBackButton title="Rate Dental Doctor" isPushBack={true} />

            <TextInput placeholder="Provide Your Review" style={{ marginTop: 15, width: '60%', padding: 10, borderWidth: 1 }}></TextInput>
            <TextInput placeholder="Provide Your Experience" style={{ marginTop: 15, marginBottom: 20, width: '60%', padding: 10, borderWidth: 1 }}></TextInput>
            <Button title="Submit Rattings" onPress={() => alert("Rattings Submitted!")} />
        </View>
    )
}
export default RateDental