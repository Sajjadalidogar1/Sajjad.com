var Login = function() {
    var Base64 = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
            var t = "";
            var n, r, i, s, o, u, a;
            var f = 0;
            e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                if (isNaN(r)) {
                    u = a = 64
                } else if (isNaN(i)) {
                    a = 64
                }
                t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
            }
            return t
        },
        decode: function(e) {
            var t = "";
            var n, r, i;
            var s, o, u, a;
            var f = 0;
            e = e.replace(/[^A-Za-z0-9+/=]/g, "");
            while (f < e.length) {
                s = this._keyStr.indexOf(e.charAt(f++));
                o = this._keyStr.indexOf(e.charAt(f++));
                u = this._keyStr.indexOf(e.charAt(f++));
                a = this._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                if (u != 64) {
                    t = t + String.fromCharCode(r)
                }
                if (a != 64) {
                    t = t + String.fromCharCode(i)
                }
            }
            t = Base64._utf8_decode(t);
            return t
        },
        _utf8_encode: function(e) {
            e = e.replace(/rn/g, "n");
            var t = "";
            for (var n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                    t += String.fromCharCode(r >> 6 | 192);
                    t += String.fromCharCode(r & 63 | 128)
                } else {
                    t += String.fromCharCode(r >> 12 | 224);
                    t += String.fromCharCode(r >> 6 & 63 | 128);
                    t += String.fromCharCode(r & 63 | 128)
                }
            }
            return t
        },
        _utf8_decode: function(e) {
            var t = "";
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                if (r < 128) {
                    t += String.fromCharCode(r);
                    n++
                } else if (r > 191 && r < 224) {
                    c2 = e.charCodeAt(n + 1);
                    t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                    n += 2
                } else {
                    c2 = e.charCodeAt(n + 1);
                    c3 = e.charCodeAt(n + 2);
                    t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    n += 3
                }
            }
            return t
        }
    }

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function(form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    var handleForgetPassword = function() {
        //$('.forget-form').validate({
        //    errorElement: 'span', //default input error message container
        //    errorClass: 'help-block', // default input error message class
        //    focusInvalid: false, // do not focus the last invalid input
        //    ignore: "",
        //    rules: {
        //        email: {
        //            required: true,
        //            email: true
        //        }
        //    },

        //    messages: {
        //        email: {
        //            required: "Email is required."
        //        }
        //    },

        //    invalidHandler: function(event, validator) { //display error alert on form submit   

        //    },

        //    highlight: function(element) { // hightlight error inputs
        //        $(element)
        //            .closest('.form-group').addClass('has-error'); // set error class to the control group
        //    },

        //    success: function(label) {
        //        label.closest('.form-group').removeClass('has-error');
        //        label.remove();
        //    },

        //    errorPlacement: function(error, element) {
        //        error.insertAfter(element.closest('.input-icon'));
        //    },

        //    submitHandler: function(form) {
        //        form.submit();
        //    }
        //});

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                let email = $('.forget-form input').val();
                if (pattern.test(email)) {
                    $("#invalidEmailDiv").hide();



                } else {
                    $("#invalidEmailDiv").show();

                    if (isRtlCode) {
                        $("#invalidForgetError").text("البريد الإلكتروني غير صحيح");
                    } else {
                        $("#invalidForgetError").text("Invalid Email");
                    }


                }
                return false;
            }
        });

        jQuery('#forget-btn').click(function() {
            let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let email = $('.forget-form input').val();
            if (pattern.test(email)) {
                $("#invalidEmailDiv").hide();

                var actionUrl = "RequestResetPassword";


                var dataPost = new FormData();
                dataPost.append('email', email);



                $.ajax({
                    type: 'POST',
                    url: actionUrl,
                    dataType: "json",
                    contentType: false,
                    processData: false,
                    data: dataPost,
                    cache: false,
                    async: true,
                    error: function() {
                        App.unblockUI();
                    },
                    success: function(data) {
                        App.unblockUI();
                        if (data.success == true) {
                            $("#invalidEmailDiv").hide();
                            $("#sucessEmailDiv").show();
                            $("#sucessForgetError").text("Check your email, تحقق من البريد الخاص بك");

                        } else {
                            $("#invalidEmailDiv").show();
                            $("#sucessEmailDiv").hide();
                            $("#invalidForgetError").text(data.error);
                        }

                    },
                    timeout: 30000 // 10 seconds
                });






            } else {
                $("#invalidEmailDiv").show();
                $("#sucessEmailDiv").hide();
                if (isRtlCode) {
                    $("#invalidForgetError").text("البريد الإلكتروني غير صحيح");
                } else {
                    $("#invalidForgetError").text("Invalid Email");
                }


            }
            return false;
        });


        jQuery('#save-password').click(function() {
            var password = $("#password").val();
            var verifyPassword = $("#passwordVerity").val();

            if (password != verifyPassword || password == '') {
                $("#invalidEmailDiv").show();
                if (isRtlCode) {
                    $("#invalidForgetError").text("كلمة المرور غير مطابقة");
                } else {
                    $("#invalidForgetError").text("password mismatch");
                }
            } else {
                var encodedString = Base64.encode(password);
                var userId = $("#tokenId").val();
                var actionUrl = "ResetPassword";


                var dataPost = new FormData();
                dataPost.append('token', userId);
                dataPost.append('password', encodedString);



                $.ajax({
                    type: 'POST',
                    url: actionUrl,
                    dataType: "json",
                    contentType: false,
                    processData: false,
                    data: dataPost,
                    cache: false,
                    async: true,
                    error: function() {
                        App.unblockUI();
                    },
                    success: function(data) {
                        App.unblockUI();
                        if (data.success == true) {
                            window.location.href = window.location.protocol + "//" + window.location.host;

                        } else {
                            $("#invalidEmailDiv").show();
                            $("#invalidForgetError").text(data.error);
                        }

                    },
                    timeout: 30000 // 10 seconds
                });
            }

            return false;
        });


        jQuery('#forget-password').click(function() {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();

            $("#invalidEmailDiv").hide();
            $("#sucessEmailDiv").hide();
        });

        jQuery('#back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    }

    var handleRegister = function() {

        function format(state) {
            if (!state.id) {
                return state.text;
            }
            var $state = $(
                '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );

            return $state;
        }

        if (jQuery().select2 && $('#country_list').size() > 0) {
            $("#country_list").select2({
                placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
                templateResult: format,
                templateSelection: format,
                width: 'auto',
                escapeMarkup: function(m) {
                    return m;
                }
            });


            $('#country_list').change(function() {
                $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
        }

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit   

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function() {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});