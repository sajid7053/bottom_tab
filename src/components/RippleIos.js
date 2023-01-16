import { Text, View, TouchableWithoutFeedback, Animated } from 'react-native'
import React, { PureComponent } from 'react'

const MAX_DIAMETER = 200;

export default class RippleFeedbackIOS extends PureComponent {
    constructor() {
        this.state = {
            scaleValue: new Animated.Value(0),
            opacityRippleValue: new Animated.Value(maxOpacity),
            opacityBackgroundValue: new Animated.Value(0),
        };
    }
    onLayoutChanged = (event) => {
        // get width and height of wrapper
        // TODO: ....
    }
    onLongPress = () => {
        // Animation of long press is slightly different than onPress animation
        Animated.timing(this.state.opacityBackgroundValue, {
            toValue: maxOpacity / 2,
            duration: 700,
        }).start();
    }
    onPress = () => {
        Animated.parallel([
            // Display background layer thru whole over the view
            // Animated.timing(this.state.opacityBackgroundValue, {
            //     toValue: maxOpacity / 2,
            //     duration: 125 + diameter,
            //     easing: Easing.in(Easing.quad),
            //     useNativeDriver: true,
            // }),
            // Opacity of ripple effect starts on maxOpacity and goes to 0
            Animated.timing(this.state.opacityRippleValue, {
                toValue: 0,
                duration: 125 + diameter,
                useNativeDriver: true,
            }),
            // Scale of ripple effect starts at 0 and goes to 1
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 125 + diameter,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start(() => {
            // After the effect is fully displayed we need background to be animated back to default
            // Animated.timing(this.state.opacityBackgroundValue, {
            //     toValue: 0,
            //     duration: 225,
            //     easing: Easing.out(Easing.quad),
            //     useNativeDriver: true,
            // }).start();

            this.setDefaultAnimatedValues();
        });
    }
    onPressIn = (event) => {
        // because we need ripple effect to be displayed exactly from press point
        this.setState({
            pressX: event.nativeEvent.locationX,
            pressY: event.nativeEvent.locationY,
        });
    }
    onPressOut = () => {
        // When user use onPress all animation happens in onPress method. But when user use long
        // press. We displaye background layer in onLongPress and then we need to animate ripple
        // effect that is done here.
        Animated.parallel([
            // Hide opacity background layer, slowly. It has to be done later than ripple
            // effect
            Animated.timing(this.state.opacityBackgroundValue, {
                toValue: 0,
                duration: 500 + diameter,
            }),
            // Opacity of ripple effect starts on maxOpacity and goes to 0
            Animated.timing(this.state.opacityRippleValue, {
                toValue: 0,
                duration: 125 + diameter,
            }),
            // Scale of ripple effect starts at 0 and goes to 1
            Animated.timing(this.state.scaleValue, {
                toValue: 1,
                duration: 125 + diameter,
                easing: Easing.out(Easing.quad),
            }),
        ]).start(this.setDefaultAnimatedValues);
    }
    setDefaultAnimatedValues = () => {
        this.state.scaleValue.setValue(0);
        this.state.opacityRippleValue.setValue(maxOpacity);
    }
    renderRippleLayer = () => {
        const {
            pressX,
            pressY,
            diameter,
        } = this.state;

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: (pressY || 0) - (diameter / 2),
                    left: (pressX || 0) - (diameter / 2),
                    width: diameter,
                    height: diameter,
                    borderRadius: (diameter) / 2,
                }]}
            />
        );
    }
    renderBackgroundLayer = () => {
        const { opacityBackgroundValue } = this.state;

        return (
            <Animated.View
                pointerEvents="none"
                style={[{
                    ...StyleSheet.absoluteFillObject,
                    opacity: opacityBackgroundValue,
                }]}
            />
        );
    }
    render() {
        const { children, disabled } = this.props;

        return (
            <TouchableWithoutFeedback
                onLayout={this.onLayoutChanged}
                onPressIn={this.onPressIn}
                onLongPress={this.onLongPress}
                onPressOut={this.onPressOut}
                onPress={this.onPress}
            >
                <View style={styles.container} pointerEvents="box-none">
                    {children}
                    {this.renderBackgroundLayer()}
                    {this.renderRippleLayer()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}