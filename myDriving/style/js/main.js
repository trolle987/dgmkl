var imageData;

document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
    cameraApp = new cameraApp();
}

function show() {
    cameraApp.run();
    
    $(".titleBar").css('height', ($(window).height() * 10) / 100 + 'px');
    $(".titleBar").css('font-size', ($(window).height() * 3.6) / 100 + 'px');
    $("#submitForm").css('top', ($(window).height() * 10) / 100 + 'px');
    $(".searchContainer").css('top', ($(window).height() * 10) / 100 + 'px');
    $("#submitForm").css('height', ($(window).height() * 90) / 100 + 'px');
    $(".searchContainer").css('height', ($(window).height() * 90) / 100 + 'px');
    $("#submitForm .spanFirstComment").css('top', ($(window).height() * 4) / 100 + 'px');
    $(".searchContainer .spanFirstComment").css('top', ($(window).height() * 4) / 100 + 'px');
    $("#submitForm .spanFirstComment, #submitForm .spanSecondComment").css('font-size', ($(window).height() * 3) / 100 + 'px');
    $(".searchContainer .spanFirstComment").css('font-size', ($(window).height() * 3) / 100 + 'px');
    $("#submitForm .spanSecondComment").css('top', ($(window).height() * 19) / 100 + 'px');
    $("#submitForm input").css('top', ($(window).height() * 9) / 100 + 'px');
    $(".searchContainer input").css('top', ($(window).height() * 9) / 100 + 'px');
    $("#submitForm textarea").css('top', ($(window).height() * 24) / 100 + 'px');
    $("#submitForm .previewImage").css('top', ($(window).height() * 40) / 100 + 'px');
    $("#txtRegPlate, #txtComment").css('font-size', ($(window).height() * 3) / 100 + 'px');
    $(".buttons").css('font-size', ($(window).height() * 3.3) / 100 + 'px');
    $(".buttons").css('height', ($(window).height() * 10) / 100 + 'px');
    $(".btnTakePhoto, .btnRemovePhoto").css('top', ($(window).height() * 63) / 100 + 'px');
    $("#submitForm .btnSubmit").css('top', ($(window).height() * 75) / 100 + 'px');
    $(".searchContainer .btnSubmit").css('top', ($(window).height() * 75) / 100 + 'px');
    $(".titleBar").css('box-shadow', '0 ' + ($(window).height() * 0.4) / 100 + 'px' + ' 0 0');
    $(".btnTakePhoto").css('box-shadow', '0 ' + ($(window).height() * 0.4) / 100 + 'px' + ' 0 0');
    $(".btnSubmit").css('box-shadow', '0 ' + ($(window).height() * 0.4) / 100 + 'px' + ' 0 0');
    $(".btnFind").css('box-shadow', '0 ' + ($(window).height() * 0.4) / 100 + 'px' + ' 0 0');
    $(".btnFind").css('top', ($(window).height() * 18) / 100 + 'px');
    $(".previewImage").css('height', ($(window).height() * 20) / 100 + 'px');
    $(".previewImage").css('width', ($(window).height() * 20) / 100 + 'px');
    $(".previewImage").css('left', ($(window).width() - ($(window).height() * 20) / 100) / 2 + 'px');
    $(".commentScroller").css('top', ($(window).height() * 24) / 100 + 'px');
    
}

function capture(sender) { 
    cameraApp._capturePhoto.apply(cameraApp, arguments)
}

function removePicture() {   
    $("#btnTakePhoto").removeClass("displayNone").addClass("displayBlock");
    $("#btnRemovePhoto").addClass("displayNone").removeClass("displayBlock");
        
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'none';
         
    // Show the captured photo.
    smallImage.src = null;
    imageData = null;
}

function cameraApp() {
}

cameraApp.prototype = {
    _pictureSource: null,
    
    _destinationType: null,
    
    run: function() {
        var that = this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
    },
    
    _capturePhoto: function() {
        var that = this;
        
        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function() {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function() {
            that._onFail.apply(that, arguments);
        }, {
                                        quality: 50,
                                        destinationType: that._destinationType.DATA_URL,
                                        saveToPhotoAlbum: true
                                    });
    },
    
    _capturePhotoEdit: function() {
        var that = this;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string.
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function() {
            that._onPhotoDataSuccess.apply(that, arguments);
        }, function() {
            that._onFail.apply(that, arguments);
        }, {
                                        quality: 20, allowEdit: true,
                                        destinationType: cameraApp._destinationType.DATA_URL
                                    });
    },
    
    _getPhotoFromLibrary: function() {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);
    },
    
    _getPhotoFromAlbum: function() {
        var that = this;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    },
    
    _getPhoto: function(source) {
        var that = this;
        // Retrieve image file location from specified source.
        navigator.camera.getPicture(function() {
            that._onPhotoURISuccess.apply(that, arguments);
        }, function() {
            cameraApp._onFail.apply(that, arguments);
        }, {
                                        quality: 50,
                                        destinationType: cameraApp._destinationType.FILE_URI,
                                        sourceType: source
                                    });
    },
    
    _onPhotoDataSuccess: function(data) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
    
        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + data;
       
        imageData = data;
                
        $("#btnRemovePhoto").removeClass("displayNone").addClass("displayBlock");
        $("#btnTakePhoto").addClass("displayNone").removeClass("displayBlock");
    },
    
    _onPhotoURISuccess: function(imageURI) {
        var smallImage = document.getElementById('smallImage');
        smallImage.style.display = 'block';
         
        // Show the captured photo.
        smallImage.src = imageURI;
    },
    
    _onFail: function(message) {
        alert(message);
    }
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}