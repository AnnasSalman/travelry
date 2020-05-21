import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {IconButton} from "react-native-paper";
import Colors from "../../constants/Colors";

const SearchIconButton = props => {
    return (
            <View>
                <IconButton
                    size={40}
                    color={Colors.DarkTheme.onSurface}
                    style={styles.button}
                    {...props}
                />
                <Text style={styles.descriptiveText}>{props.children}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: Colors.DarkTheme.onSurface,
        borderRadius: 5,
        backgroundColor: Colors.DarkTheme.surface,
        opacity: 1,
        margin: 15,
        marginBottom: 5,
        marginTop: 7
    },
    descriptiveText: {
        textAlign: 'center',
        color: Colors.DarkTheme.onSurface
    }
});

export default SearchIconButton;
