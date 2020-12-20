import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInfo{
    constructor() {
    }
    async setUserInfo(values) {
        const jsonValue = JSON.stringify(values)
        await AsyncStorage.setItem('userData', jsonValue)
    }
    async getUserInfo() {
        const jsonValue = await AsyncStorage.getItem('userData')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    async removeUser() {
        await AsyncStorage.removeItem('userData')
    }
}

export default UserInfo
