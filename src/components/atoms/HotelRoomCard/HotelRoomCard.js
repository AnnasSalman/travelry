import React, {useState} from "react";
import {TouchableOpacity, Image} from 'react-native'

const HotelRoomCard = props => {

    const [roomImage, setRoomImage] = useState({uri: props.image})

    const _onImageError = () => {
        setRoomImage({uri: 'https://thumbs.dreamstime.com/b/empty-room-generic-d-rendered-illustration-55950877.jpg'})
    }

    return(
        <TouchableOpacity
            onPress={props.onPress}
            style={props.style}
        >
            <Image
                style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    resizeMode: 'cover'
                }}
                source={roomImage}
                onError={_onImageError}
            />
        </TouchableOpacity>
    )
}

export default HotelRoomCard
