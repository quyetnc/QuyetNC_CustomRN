import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	Image,
	FlatList,
	PermissionsAndroid,
	Alert,
	Platform,
	Text,
} from "react-native";
import images from "../../res/images";
import Icon from "react-native-vector-icons/Feather";
import { Sizes } from "@dungdang/react-native-basic";
import { Dimensions } from "react-native";
import themes from "../../res/themes";
import {
	objectIsNull,
	arrayIsEmpty,
	stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import { theme } from "@dungdang/react-native-full";
import ImageSlide from "../custom/ImageSlide";
const screenWidth = Math.round(Dimensions.get("window").width);
const numOfRow = 4;
const requestReadStoragePermission = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log("You can ReadStorage");
		} else {
			console.log("ReadStorage permission denied");
		}
	} catch (err) {
		console.warn(err);
	}
};
const requestWriteStoragePermission = async () => {
	try {
		let granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log("You can WriteStorage");
		} else {
			console.log("ReadStorage permission denied");
		}
	} catch (err) {
		console.warn(err);
	}
};
export const renderIconRemove = (size, onPress, color, style) => {
	return (
		<TouchableOpacity
			style={{
				width: Sizes.s40,
				height: Sizes.s40,
				position: "absolute",
				top: Sizes.s10,
				right: Sizes.s10,
				borderRadius: Sizes.s15,
				...style,
			}}
			onPress={onPress}
		>
			<Image
				style={{
					width: size,
					height: size,
				}}
				source={require("../../res/images/ic_cancel.png")}
			/>
			{/* <Icon
        solid
        name={'times-circle'}
        color={color}
        size={size}
        style={{position: 'absolute', top: 0}}
      /> */}
		</TouchableOpacity>
	);
};

class ImagePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listImage: !objectIsNull(this.props.items)
				? [...this.props.items]
				: [],
			index: 0,
			isShow: false,
		};
		this.imageSlide = React.createRef();
	}
	componentDidUpdate(prevProps) {
		// console.log("ffffff11111", this.props.items)
		if (
			this.props.items !== prevProps.items &&
			!objectIsNull(this.props.items)
		) {
			// console.log("ffffff22222", this.props.items)
			this.setState({
				listImage: !objectIsNull(this.props.items)
					? [...this.props.items]
					: [],
			});
		}
	}

	returnData = (data) => {
		this.setState(
			{
				listImage: data.selectedImage,
			},
			() => this.props.selectedImage(data.selectedImage)
		);
	};
	getValues() {
		return this.state.listImage;
	}
	render() {
		let _listImage = this.state.listImage.filter((item, index) => {
			if (
				this.state.isShow === false &&
				objectIsNull(this.props.isWrite)
			) {
				if (index < 4) return item;
			} else {
				return item;
			}
		});
		if (objectIsNull(this.props.hideAdd)) {
			if (
				!arrayIsEmpty(this.state.listImage) &&
				this.state.listImage.length >= 10
			) {
				_listImage = [..._listImage];
			} else {
				_listImage = [..._listImage, { plusImage: true }];
			}
		}
		return (
			<View
				style={{ ...this.props.style }}
				onLayout={({ nativeEvent }) => {
					if (!objectIsNull(this.props.onLayout)) {
						this.props.onLayout(nativeEvent.layout.height);
					}
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{!objectIsNull(this.props.isTimeLine) && (
						<View
							style={{
								width: Sizes.s25,
								height: Sizes.s25,
								borderRadius: Sizes.s25,
								backgroundColor: "#f2645d",
								// marginTop: themes.paddingVer,
								marginRight: Sizes.s30,
								alignSelf: "flex-start",
							}}
						></View>
					)}
					{/* <Text
						style={{
							...themes.titleBig,
							color: themes.colors.black,
							flex: 1,
							...this.props.styleTitle,
						}}
					>
						{this.props.title}
					</Text> */}
					{objectIsNull(this.props.isWrite) &&
						!arrayIsEmpty(this.state.listImage) &&
						this.state.listImage.length > 4 && (
							<TouchableOpacity
								onPress={() => {
									this.setState({
										isShow: !this.state.isShow,
									});
								}}
							>
								<Text
									style={{
										...themes.titleNormal,
										color: themes.colors.blue,
									}}
								>
									{this.state.isShow === true
										? "Thu gọn"
										: "Tất cả ảnh"}
								</Text>
							</TouchableOpacity>
						)}
				</View>

				<FlatList
					style={{ marginTop: Sizes.s10 }}
					data={_listImage}
					renderItem={({ item, index }) => {
						// console.log('xxxxx',item)
						if (item.plusImage) {
							if (
								this.props.isWrite &&
								this.state.listImage.length <
									this.props.maximumImage
							) {
								// console.log('2222')
								return (
									<TouchableOpacity
										disabled={
											!item.plusImage ? true : false
										}
										onPress={async () => {
											if (Platform.OS === "android") {
												await requestWriteStoragePermission();
												await requestReadStoragePermission();
											}
											this.props.navigation.navigate(
												"ShowGallery",
												{
													maximumImage: this.props
														.maximumImage,
													index: this.state.index,
													multiple: true,
													selectedImage: this.state
														.listImage,
													returnData: (data) => {
														this.returnData(data);
													},
												}
											);
										}}
										style={{
											width:
												(screenWidth -
													themes.paddingHoz * 2 -
													Sizes.s5 * (numOfRow * 2)) /
												numOfRow,
											aspectRatio: 1,
											marginHorizontal: Sizes.s5,
											marginVertical: Sizes.s5,
											justifyContent: "center",
											borderColor: "#EFEFEF",
											// borderStyle: "dashed",
											borderWidth: !item.plusImage
												? 0
												: Sizes.s2,
											borderRadius: Sizes.s15,
										}}
									>
										<Icon
											light
											name={"plus"}
											color={"#2F6BFE"}
											size={Sizes.s60}
											style={{
												alignSelf: "center",
												alignItems: "center",
											}}
										/>
										<Text
											style={{
												paddingVertical: Sizes.s10,
												alignSelf: "center",
												fontSize: Sizes.s20,
												color:"#2F6BFE"
											}}
										>
											Thêm ảnh
										</Text>
									</TouchableOpacity>
								);
							} else {
								// console.log('1111')
								return null;
							}
						} else {
							// console.log('000000')
							return (
								<TouchableOpacity
									onPress={() => {
										let list = [];
										let tmp = 1;
										for (const item of this.state
											.listImage) {
											if (
												tmp <=
												this.state.listImage.length
											) {
												list.push({
													label: "",
													url: !stringIsEmpty(
														item.FileURL
													)
														? item.FileURL
														: !objectIsNull(
																item.node
														  ) &&
														  !objectIsNull(
																item.node.image
														  )
														? item.node.image.uri
														: "",
												});
											}
											++tmp;
										}

										this.imageSlide.current.open(
											index,
											list
										);
									}}
									key={item.FileName}
									style={{
										// width:100,height:100,
										// backgroundColor:"#ff3333",
										width:
											(screenWidth -
												themes.paddingHoz * 2 -
												Sizes.s5 * (numOfRow * 2)) /
											numOfRow,
										aspectRatio: 1,
										marginHorizontal: Sizes.s5,
										marginVertical: Sizes.s5,
										justifyContent: "center",
										borderColor: themes.colors.grey,
										borderWidth: !item.plusImage
											? 0
											: Sizes.s2,
										borderRadius: Sizes.s15,
									}}
								>
									{!stringIsEmpty(item.FileURL_Thumnail) ? (
										<Image
											defaultSource={require("../../res/images/ic_no_image.png")}
											style={{
												width: "100%",
												height: "100%",
												borderRadius: Sizes.s20,
											}}
											source={{
												uri: item.FileURL_Thumnail,
											}}
										/>
									) : !stringIsEmpty(item.FileURL) ? (
										<Image
											defaultSource={require("../../res/images/ic_no_image.png")}
											style={{
												width: "100%",
												height: "100%",
												borderRadius: Sizes.s20,
											}}
											source={{
												uri: item.FileURL,
											}}
										/>
									) : (
										<Image
											defaultSource={require("../../res/images/ic_no_image.png")}
											style={{
												width: "100%",
												height: "100%",
												borderRadius: Sizes.s20,
											}}
											source={{
												uri:
													!objectIsNull(item.node) &&
													!objectIsNull(
														item.node.image
													)
														? item.node.image.uri
														: "",
											}}
										/>
									)}
									{this.props.isWrite &&
										renderIconRemove(
											Sizes.s40,
											() => {
												let array = this.state
													.listImage;
												let index = this.state.listImage.indexOf(
													item
												);
												array.splice(index, 1);
												// this.props.onSelectImage()
												this.setState({
													listImage: array,
												});
											},
											themes.colors.red
										)}
								</TouchableOpacity>
							);
						}
					}}
					numColumns={numOfRow}
					keyExtractor={(item, index) => index.toString()}
				/>
				<ImageSlide ref={this.imageSlide} />
			</View>
		);
	}
}

ImagePicker.defaultProps = {
	maximumImage: 10,
};

export default ImagePicker;
