(function() {
    function f(ac) {
        var n = ac;
        var K = new g(n);
        if (K.isAvailable() == false) {
            savingInfo.style.display = "none"
        }
        var G = new d(paintCanvas, 5);
        var ai = new c(n, 470, 470);
        var at = 0;
        var J = "pencil";
        var D = false;
        var O = document.getElementById("animDiv");
        var o = document.getElementById("newAnimation");
        var am = document.getElementById("addFrame");
        var Q = document.getElementById("duplicateFrame");
        var q = document.getElementById("prevFrame");
        var V = document.getElementById("nextFrame");
        var aj = document.getElementById("removeFrame");
        var j = document.getElementById("exportGif");
        var ah = document.getElementById("penOptions");
        var stage = document.createElement("canvas");
        var T = 2500000;
        var F = null;
        var v = new Date().getTime();
        stage.width = paintCanvas.width;
        stage.height = paintCanvas.height;
        var z = false;
        var aq = {
            draw: false,
            erase: false,
            mx: 0,
            my: 0
        };
        var k = {
            size: null,
            color: null,
            tool: null,
            delay: null,
            transparency: null
        };
        var aa = new Date().getTime();
        setInterval(function() {
            var au = new Date().getTime();
            TWEEN.update();
            if (D == true) {
                n.processPlayback(au - aa)
            }
            aa = au
        },
        30);
        function t(au) {
            var av = au.target.getBoundingClientRect();
            return {
                x: (au.clientX - av.left),
                y: (au.clientY - av.top),
                force: 1
            }
        }
        function M(au, aw, av) {
            return {
                x: (au.pageX - aw.offsetLeft - (av.offsetParent.offsetLeft + av.offsetParent.offsetParent.offsetLeft + av.offsetLeft - aw.offsetLeft)),
                y: (au.pageY - aw.offsetTop - (av.offsetParent.offsetTop + av.offsetParent.offsetParent.offsetTop + av.offsetTop - aw.offsetTop)),
                force: 1
            }
        }
        function h(av) {
            var au = av;
            if (! (typeof av.force === "undefined")) {
                au = av.force;
                if (au == 0) {
                    au = 1
                }
                au = au * 0.6 + 0.4;
                if (au < 0.4) {
                    au = 0.4
                }
                if (au > 1) {
                    au = 1
                }
            }
            return au
        }
        function H(au) {
            var av = au.target.getBoundingClientRect();
            return {
                x: (au.touches[0].clientX - av.left),
                y: (au.touches[0].clientY - av.top),
                force: (h(au.touches[0]))
            }
        }
        function E(au, aw, av) {
            return {
                x: (au.touches[0].pageX - aw.offsetLeft - (av.offsetParent.offsetLeft + av.offsetParent.offsetParent.offsetLeft + av.offsetLeft - aw.offsetLeft)),
                y: (au.touches[0].pageY - aw.offsetTop - (av.offsetParent.offsetTop + av.offsetParent.offsetParent.offsetTop + av.offsetTop - aw.offsetTop)),
                force: h(au.touches[0])
            }
        }
        function N(au) {
            if (z == false) {
                z = true
            }
            G.addUndo(n.frames[at]);
            ao();
            aq.draw = true;
            aq.mx = au.x;
            aq.my = au.y;
            J = n.getTool();
            if (aq.erase == true) {
                n.setTool("eraser")
            }
            n.drawPoint(aq.mx, aq.my, au.force)
        }
        function ab(au) {
            if (aq.draw != true) {
                return
            }
            n.drawLine(aq.mx, aq.my, au.x, au.y, au.force);
            aq.mx = au.x;
            aq.my = au.y
        }
        function C(au) {
            if (aq.erase == true) {
                n.setTool(J);
                aq.erase = false
            }
            aq.draw = false;
            aq.mx = au.x;
            aq.my = au.y;
            K.saveFrame(n.currentFrame, paintCanvas)
        }
        function W() {
            if (aq.draw == true) {
                K.saveFrame(n.currentFrame, paintCanvas);
                aq.draw = false
            }
        }
        var L = null;
        function ag(ax, aw) {
            var ay = button_option_canvas.cloneNode(true);
            ay.id = null;
            var av = ay.children[0];
            var au = av.getContext("2d");
            au.strokeStyle = "#000000";
            au.fillStyle = "#000000";
            au.beginPath();
            au.arc(av.width / 2, av.height / 2, aw / 2, 0, 2 * Math.PI, false);
            au.fill();
            au.lineWidth = 1;
            au.stroke();
            ay.addEventListener("click",
            function(az) {
                if (L != null) {
                    L.className = L.className.replace("btn_option_selected", "")
                }
                ay.className += " btn_option_selected";
                L = ay;
                n.setPenSize(aw);
                ax.style.visibility = "hidden";
                r(penOptionsCanvas)
            });
            ax.appendChild(ay);
            return ay
        }
        var P = null;
        function w(av, au) {
            var ax = button_option_circle.cloneNode(true);
            ax.id = null;
            var aw = ax.children[0];
            aw.style.backgroundColor = au;
            ax.addEventListener("click",
            function(ay) {
                if (P != null) {
                    P.className = P.className.replace("btn_option_selected", "")
                }
                ax.className += " btn_option_selected";
                P = ax;
                if (n.getTool == "eraser") {
                    n.setTool("pencil")
                }
                n.setPenColor(aw.style.backgroundColor);
                av.style.visibility = "hidden";
                r(penOptionsCanvas)
            });
            av.appendChild(ax);
            ax.getColor = function() {
                return aw.style.backgroundColor
            };
            ax.setColor = function(ay) {
                aw.style.backgroundColor = ay
            };
            return ax
        }
        var ap = new Array();
        function af(av) {
            var aw = button_option_add_color.cloneNode(true);
            aw.id = null;
            var au = aw.children[0];
            au.addEventListener("change",
            function(ax) {
                var ay = ax.target.value;
                for (var az = ap.length - 1; az > 0; az--) {
                    ap[az].setColor(ap[az - 1].getColor())
                }
                ap[0].setColor(ay);
                ap[0].click();
                K.saveCustomColors(ap)
            });
            av.appendChild(aw);
            return aw
        }
        var ae = null;
        function U(aw, av) {
            var ax = button_option.cloneNode(true);
            ax.id = null;
            var au = document.getElementById(av + "Gfx").cloneNode(true);
            au.id = null;
            ax.appendChild(au);
            ax.addEventListener("click",
            function(ay) {
                if (ae != null) {
                    ae.className = ae.className.replace("btn_option_selected", "")
                }
                ax.className += " btn_option_selected";
                ae = ax;
                n.setTool(av);
                aw.style.visibility = "hidden";
                r(penOptionsCanvas)
            });
            aw.appendChild(ax);
            return ax
        }
        function B(au, av) {
            var aw = document.createElement("div");
            aw.className = "btn_option_separator";
            if (av != null) {
                aw.innerHTML = av
            }
            au.appendChild(aw);
            return aw
        }
        var Z = null;
        function i(aw, av) {
            var ax = button_option.cloneNode(true);
            ax.id = null;
            var au = document.getElementById("delay" + av).cloneNode(true);
            au.id = null;
            ax.appendChild(au);
            ax.addEventListener("click",
            function(ay) {
                if (Z != null) {
                    Z.className = Z.className.replace("btn_option_selected", "")
                }
                ax.className += " btn_option_selected";
                Z = ax;
                n.setDelay(av);
                K.saveHeader();
                aw.style.visibility = "hidden"
            });
            aw.appendChild(ax);
            return ax
        }
        var al = null;
        function ad(ax, aw) {
            var ay = button_option_canvas.cloneNode(true);
            ay.id = null;
            var av = ay.children[0];
            var au = av.getContext("2d");
            au.strokeStyle = "#000000";
            if (aw == true) {
                au.fillStyle = "#AAAAAA";
                au.beginPath();
                au.arc(av.width / 2 - 5, av.height / 2, 8, 0, 2 * Math.PI, false);
                au.fill()
            }
            au.fillStyle = "#000000";
            au.beginPath();
            au.arc(av.width / 2 + 5, av.height / 2, 8, 0, 2 * Math.PI, false);
            au.fill();
            ay.addEventListener("click",
            function(az) {
                if (al != null) {
                    al.className = al.className.replace("btn_option_selected", "")
                }
                ay.className += " btn_option_selected";
                al = ay;
                if (aw) {
                    alphaCanvas.style.visibility = "visible";
                    page.children[0].style.visibility = "visible"
                } else {
                    alphaCanvas.style.visibility = "hidden";
                    page.children[0].style.visibility = "hidden"
                }
                ax.style.visibility = "hidden"
            });
            ax.appendChild(ay);
            return ay
        }
        function u(av, aw, ay) {
            var ax = button_option.cloneNode(true);
            ax.id = null;
            var au = aw.cloneNode(true);
            au.id = null;
            ax.appendChild(au);
            ax.addEventListener("click",
            function(az) {
                ay(az);
                av.style.visibility = "hidden"
            });
            av.appendChild(ax);
            return ax
        }
        function m(aw) {
            var ax = document.getElementById("page").cloneNode(true);
            ax.id = null;
            var av = ax.children[0];
            av.getContext("2d").clearRect(0, 0, av.width, av.height);
            av.getContext("2d").drawImage(n.frames[(aw - 1 < 0) ? n.frames.length - 1 : aw - 1].canvas, 0, 0);
            var au = ax.children[1];
            au.getContext("2d").clearRect(0, 0, au.width, au.height);
            au.getContext("2d").drawImage(n.frames[aw].canvas, 0, 0);
            var ay = ax.children[2];
            ay.innerHTML = (aw + 1) + "/" + n.frames.length;
            return ax
        }
        function S() {
            if (n.frames.length <= 1) {
                return
            }
            n.flushFrame();
            at = (at + 1) % n.frames.length;
            var au = m(at);
            new TWEEN.Tween({
                rot: -270,
                target: au,
                destPage: at
            }).to({
                rot: 0
            },
            500).delay(0).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                this.target.style.transform = "rotateY(" + this.rot + "deg)";
                if (this.rot > -90) {
                    this.target.style.zIndex = Math.floor( - this.rot) * 100;
                    this.target.children[2].style.display = "inline"
                } else {
                    if (this.rot <= -180) {
                        this.target.style.zIndex = -10;
                        this.target.children[2].style.display = "none"
                    } else {
                        this.target.style.zIndex = 10;
                        this.target.children[2].style.display = "none"
                    }
                }
            }).onStart(function() {
                this.target.style.transform = "rotateY(" + this.rot + "deg)";
                if (this.rot <= -180) {
                    this.target.style.zIndex = -10
                } else {
                    this.target.style.zIndex = 10
                }
            }).onComplete(function() {
                n.setFrame(this.destPage);
                this.target.parentNode.removeChild(this.target)
            }).start();
            O.appendChild(au);
            ao()
        }
        function A() {
            if (n.frames.length <= 1) {
                return
            }
            n.flushFrame();
            at = (at + 1) % n.frames.length;
            var au = m(at);
            au.style.transformOrigin = "center top";
            new TWEEN.Tween({
                top: -50,
                rot: 80,
                alpha: 0.5,
                target: au,
                destPage: at
            }).to({
                top: 0,
                rot: 0,
                alpha: 1
            },
            250).delay(0).easing(TWEEN.Easing.Cubic.In).onUpdate(function() {
                this.target.style.top = this.top + "px";
                this.target.style.transform = "rotateX(" + this.rot + "deg)";
                this.target.style.opacity = this.alpha;
                this.target.style.zIndex = Math.floor(this.rot) * 100
            }).onStart(function() {
                this.target.style.transform = "rotateY(" + this.rot + "deg)";
                if (this.rot <= -180) {
                    this.target.style.zIndex = -10
                } else {
                    this.target.style.zIndex = 10
                }
            }).onComplete(function() {
                n.setFrame(this.destPage);
                this.target.parentNode.removeChild(this.target)
            }).start();
            O.appendChild(au);
            ao();
            an()
        }
        function I() {
            if (n.frames.length <= 1) {
                return
            }
            n.flushFrame();
            var au = m(at);
            new TWEEN.Tween({
                rot: 0,
                target: au
            }).to({
                rot: -360
            },
            1000).delay(0).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                this.target.style.transform = "rotateY(" + this.rot + "deg)";
                if (this.rot > -90) {
                    this.target.style.zIndex = Math.floor( - this.rot) * 100;
                    this.target.children[2].style.display = "inline"
                } else {
                    if (this.rot <= -180) {
                        this.target.style.zIndex = -10;
                        this.target.children[2].style.display = "none"
                    } else {
                        this.target.style.zIndex = 10;
                        this.target.children[2].style.display = "none"
                    }
                }
            }).onStart(function() {
                this.target.style.transform = "rotateY(" + this.rot + "deg)";
                if (this.rot <= -180) {
                    this.target.style.zIndex = -10
                } else {
                    this.target.style.zIndex = 10
                }
            }).onComplete(function() {
                this.target.parentNode.removeChild(this.target)
            }).start();
            at--;
            if (at < 0) {
                at = n.frames.length - 1
            }
            n.setFrame(at);
            O.appendChild(au);
            ao()
        }
        function l() {
            n.flushFrame();
            var av = m(at);
            av.style.transformOrigin = "center bottom";
            new TWEEN.Tween({
                bottom: 0,
                rot: 0,
                alpha: 1,
                target: av
            }).to({
                bottom: 50,
                rot: -80,
                alpha: 0
            },
            500).delay(0).easing(TWEEN.Easing.Cubic.Out).onUpdate(function() {
                this.target.style.transform = "rotateX(" + this.rot + "deg)";
                this.target.style.opacity = this.alpha * 5;
                this.target.style.top = this.bottom + "px";
                if (this.rot > -90) {
                    this.target.style.zIndex = Math.floor( - this.rot) * 100;
                    this.target.children[2].style.visibility = "visible"
                } else {
                    if (this.rot <= -180) {
                        this.target.style.zIndex = -10;
                        this.target.children[2].style.visibility = "hidden"
                    } else {
                        this.target.style.zIndex = 10;
                        this.target.children[2].style.visibility = "hidden"
                    }
                }
            }).onStart(function() {
                this.target.style.zIndex = 10
            }).onComplete(function() {
                this.target.parentNode.removeChild(this.target)
            }).start();
            var au = n.currentFrame;
            K.removeFrame(au);
            n.removeFrame(at);
            at--;
            if (at < 0) {
                at = n.frames.length - 1
            }
            n.setFrame(at);
            O.appendChild(av);
            ao();
            an()
        }
        function ar() {
            ao();
            an()
        }
        function ao() {
            if (G.canUndo(n.frames[at]) == true) {
                undoDraw.className = "btn"
            } else {
                undoDraw.className = "btn_inactive"
            }
        }
        function an() {
            if (n.frames.length > 1) {
                q.className = "btn";
                V.className = "btn"
            } else {
                q.className = "btn_inactive";
                V.className = "btn_inactive"
            }
        }
        function y() {
            if (G.doUndo(n.frames[at]) == true) {
                K.saveFrame(n.currentFrame, paintCanvas)
            }
            ao()
        }
        function R() {
            n.flushFrame();
            z = true;
            var au = n.addFrame(at + 1);
            if (au != null) {
                K.addFrame(au);
                A()
            }
            ar()
        }
        function p() {
            n.flushFrame();
            z = true;
            var au = n.addFrame(at + 1);
            if (au != null) {
                au.ctx.drawImage(n.frames[at].canvas, 0, 0);
                K.addFrame(au);
                A()
            }
            ar()
        }
        function x() {
            var au = stage.getContext("2d");
            au.clearRect(0, 0, stage.width, stage.height);
            au.drawImage(paintCanvas, 0, 0)
        }
        function Y() {
            z = true;
            G.addUndo(n.frames[at]);
            ao();
            var av = paintCanvas.getContext("2d");
            var au = av.globalCompositeOperation;
            av.globalCompositeOperation = "source-over";
            av.drawImage(s, 0, 0);
            av.globalCompositeOperation = au;
            K.saveFrame(n.currentFrame, paintCanvas)
        }
        function ak() {
            paintCanvas.addEventListener("mousedown",
            function(aH) { (aH.button == 2) ? aq.erase = true: aq.erase = false;
                N(t(aH));
                aH.preventDefault()
            });
            paintCanvas.addEventListener("touchstart",
            function(aH) {
                N(H(aH));
                aH.preventDefault()
            });
            mainDivActive.addEventListener("mousemove",
            function(aH) {
                if (aq.draw == true) {
                    aH.preventDefault()
                }
                ab(M(aH, mainDivActive, paintCanvas));
                aH.preventDefault()
            });
            mainDivActive.addEventListener("touchmove",
            function(aH) {
                if (aq.draw == true) {
                    ab(E(aH, mainDivActive, paintCanvas));
                    aH.preventDefault()
                }
            });
            paintCanvas.addEventListener("mouseup",
            function(aH) {
                C(t(aH));
                aH.preventDefault()
            });
            paintCanvas.addEventListener("touchend",
            function(aH) {
                C(H(aH));
                aH.preventDefault()
            });
            paintCanvas.addEventListener("contextmenu",
            function(aH) {
                aH.preventDefault();
                return false
            });
            document.addEventListener("mouseup",
            function(aH) {
                W()
            });
            document.addEventListener("touchend",
            function(aH) {
                W()
            });
            o.addEventListener("click",
            function(aH) {
                if (confirm("Clear this animation?")) {
                    X();
                    at = 0;
                    K.removeAll()
                }
            });
            am.addEventListener("click",
            function(aH) {
                R()
            });
            Q.addEventListener("click",
            function(aH) {
                p()
            });
            q.addEventListener("click",
            function(aH) {
                I()
            });
            V.addEventListener("click",
            function(aH) {
                S()
            });
            aj.addEventListener("click",
            function(aH) {
                l();
                if (z == true) {
                    if (n.frames.length <= 1) {
                        z = false
                    }
                }
            });
            j.addEventListener("click",
            function(aH) {
                aB()
            });
            ah.addEventListener("mouseover",
            function(aH) {
                penOptionsImg.style.transform = "scale(1.2)";
                penOptionsPopup.style.visibility = "visible"
            });
            ah.addEventListener("mouseout",
            function(aH) {
                penOptionsImg.style.transform = "scale(1.0)";
                penOptionsPopup.style.visibility = "hidden"
            });
            animSettings.addEventListener("mouseover",
            function(aH) {
                animSettingsBack.style.transform = "scale(1.2)";
                animSettingsPopup.style.visibility = "visible"
            });
            animSettings.addEventListener("mouseout",
            function(aH) {
                animSettingsBack.style.transform = "scale(1.0)";
                animSettingsPopup.style.visibility = "hidden"
            });
            playAnimation.addEventListener("click",
            function(aH) {
                n.resetPlayback(playbackCanvas);
                D = true;
                playbackBack.style.display = "inline"
            });
            playbackBack.addEventListener("click",
            function(aH) {
                D = false;
                playbackBack.style.display = "none"
            });
            uploadButtonActive.addEventListener("click",
            function(aH) {
                ay();
                n.flushFrame();
                z = false;
                ai.process(function(aI) {
                    uploadProgressBar.style.width = (aI * 0.5) + "%"
                },
                function(aI, aJ) {
                    if (aI.size >= T) {
                        au(aI)
                    } else {
                        new e(v, aI,
                        function(aK) {
                            uploadProgressBar.style.width = 50 + (aK * 0.5) + "%"
                        },
                        function(aK) {
                            if (aK != "-1" && aK.length == 8) {
                                K.removeAll();
                                window.location.href = "anim=" + aK
                            } else {
                                if (aK == "-3") {
                                    au(aI)
                                } else {
                                    aE(aI)
                                }
                            }
                        },
                        function() {
                            aE(aI)
                        })
                    }
                })
            });
            uploadButtonCancel.addEventListener("click",
            function(aH) {
                aA()
            });
            cancelButtonOffline.addEventListener("click",
            function(aH) {
                aA()
            });
            cancelButtonError.addEventListener("click",
            function(aH) {
                aA()
            });
            undoDraw.addEventListener("click",
            function(aH) {
                y()
            });
            function aA() {
                uploadWindow.style.display = "none";
                D = false
            }
            function aB() {
                n.resetPlayback(uploadCanvas);
                D = true;
                uploadWindow.style.display = "inline";
                uploadButtons.style.display = "inline";
                uploadProgress.style.display = "none";
                uploadSizeError.style.display = "none";
                uploadError.style.display = "none"
            }
            function ay() {
                n.resetPlayback(uploadCanvas);
                D = true;
                uploadWindow.style.display = "inline";
                uploadButtons.style.display = "none";
                uploadProgress.style.display = "inline";
                uploadSizeError.style.display = "none";
                uploadError.style.display = "none"
            }
            function au(aH) {
                z = true;
                downloadButtonOffline.href = window.URL.createObjectURL(aH);
                downloadButtonOffline.download = "flipanim.gif";
                errorProgressBar.style.width = (T / aH.size * 100) + "%";
                errorProgressBarText.innerHTML = Math.floor((aH.size - T) / T * 100) + "% too large";
                uploadButtons.style.display = "none";
                uploadProgress.style.display = "none";
                uploadSizeError.style.display = "inline";
                uploadError.style.display = "none";
                n.resetPlayback(uploadCanvas);
                D = true;
                uploadWindow.style.display = "inline"
            }
            function aE(aH) {
                z = true;
                downloadButtonError.href = window.URL.createObjectURL(aH);
                downloadButtonError.download = "flipanim.gif";
                uploadButtons.style.display = "none";
                uploadProgress.style.display = "none";
                uploadSizeError.style.display = "none";
                uploadError.style.display = "inline";
                n.resetPlayback(uploadCanvas);
                D = true;
                uploadWindow.style.display = "inline"
            }
            window.onbeforeunload = function(aH) {
                if (z == true && K.isAvailable() == false) {
                    aH.returnValue = "All unsaved animation frames will be lost! Proceed?";
                    return "All unsaved animation frames will be lost! Proceed?"
                }
                return null
            };
            document.addEventListener("keypress",
            function(aH) {
                if (aH.ctrlKey) {
                    if (aH.key == "c") {
                        x();
                        aH.preventDefault()
                    } else {
                        if (aH.key == "v") {
                            Y();
                            aH.preventDefault()
                        } else {
                            if (aH.key == "z") {
                                y();
                                aH.preventDefault()
                            } else {
                                if (aH.key == "n") {
                                    R();
                                    aH.preventDefault()
                                }
                            }
                        }
                    }
                } else {
                    if (aH.keyCode == 37) {
                        I();
                        aH.preventDefault()
                    } else {
                        if (aH.keyCode == 39) {
                            S();
                            aH.preventDefault()
                        }
                    }
                }
            });
            var av = penOptionsPopup;
            B(av, "Color");
            var aw = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];
            for (var aC = 0; aC < aw.length; aC++) {
                var ax = w(av, aw[aC]);
                if (aC == 9) {
                    k.color = ax
                }
            }
            B(av);
            af(av);
            for (var aC = 0; aC < 4; aC++) {
                ap.push(w(av, "#ffffff"))
            }
            B(av, "Size");
            var aG = [2, 5, 10, 20, 30];
            for (var aC = 0; aC < aG.length; aC++) {
                var ax = ag(av, aG[aC]);
                if (aC == 1) {
                    k.size = ax
                }
            }
            B(av, "Tool");
            var aD = ["filler", "eraser", "pencil", "marker", "paintbrush"];
            for (var aC = 0; aC < aD.length; aC++) {
                var ax = U(av, aD[aC]);
                if (aC == 2) {
                    k.tool = ax
                }
            }
            var az = animSettingsPopup;
            B(az, "Page transparency");
            k.transparency = ad(az, true);
            ad(az, false);
            B(az, "Animation speed");
            var aF = [400, 300, 200, 150, 100];
            for (var aC = 0; aC < aF.length; aC++) {
                var ax = i(az, aF[aC]);
                if (aC == 2) {
                    k.delay = ax
                }
            }
            B(az, "Copy/Paste");
            u(az, copyGfx,
            function() {
                x()
            });
            u(az, pasteGfx,
            function() {
                Y()
            });
            X();
            K.activate();
            K.loadAll();
            K.loadCustomColors(ap);
            ar()
        }
        function X() {
            n.reset();
            k.size.click();
            k.color.click();
            k.tool.click();
            k.delay.click();
            k.transparency.click();
            ao();
            an();
            z = false;
            v = new Date().getTime()
        }
        function r(ax) {
            var au = ax.getContext("2d");
            var ay = n.getPenSize();
            var av = n.getPenColor();
            var aw = n.getTool();
            if (aw == "eraser") {
                av = "#FFFFFF"
            }
            au.clearRect(0, 0, ax.width, ax.height);
            au.lineWidth = ay;
            au.strokeStyle = av;
            au.fillStyle = av;
            au.lineJoin = "round";
            au.imageSmoothingEnabled = true;
            au.beginPath();
            au.moveTo(10, 60);
            au.bezierCurveTo( - 10, 10, 35, 35, 35, 35);
            au.stroke();
            au.beginPath();
            au.arc(10, 60, ay / 2, 0, 2 * Math.PI, false);
            au.arc(35, 35, ay / 2, 0, 2 * Math.PI, false);
            au.fill();
            if (ae != null) {
                penOptionsTool.style.background = ae.children[0].style.background
            }
        }
        ak()
    }
    function g(r) {
        var j = false;
        var q = new Array();
        var k = r;
        function m() {
            j = true
        }
        function i() {
            var w = "test";
            try {
                localStorage.setItem(w, w);
                localStorage.removeItem(w);
                return true
            } catch(v) {
                return false
            }
        }
        function s(x) {
            if (i() == false || j != true) {
                return null
            }
            var v = JSON.parse(localStorage.getItem("colors"));
            if (v == null) {
                return
            }
            for (var w = 0; w < v.length; w++) {
                x[w].setColor(v[w])
            }
        }
        function u(x) {
            if (i() == false || j != true) {
                return null
            }
            var v = new Array();
            for (var w = 0; w < x.length; w++) {
                v.push(x[w].getColor())
            }
            localStorage.setItem("colors", JSON.stringify(v))
        }
        function h() {
            if (i() == false || j != true) {
                return null
            }
            q = new Array();
            q = JSON.parse(localStorage.getItem("frames"));
            if (q == null) {
                return null
            }
            k.reset();
            for (var w = 0; w < q.length - 1; w++) {
                k.addFrame()
            }
            for (var w = 0; w < q.length; w++) { (function() {
                    var z = k.frames[w];
                    var A = w;
                    z.uid = q[w];
                    var y = localStorage.getItem(z.uid);
                    var x = new Image;
                    x.onload = function() {
                        z.ctx.drawImage(x, 0, 0);
                        if (A == 0 || A == q.length - 1) {
                            k.setFrame(0, false)
                        }
                    };
                    x.src = y
                })()
            }
            var v = parseInt(localStorage.getItem("delay"));
            k.setDelay(v)
        }
        function o() {
            if (i() == false || j != true) {
                return null
            }
            q = new Array();
            for (var v = 0; v < k.frames.length; v++) {
                q.push(k.frames[v].uid)
            }
            localStorage.setItem("frames", JSON.stringify(q));
            localStorage.setItem("delay", k.getDelay())
        }
        function l(x, w) {
            if (i() == false || j != true) {
                return null
            }
            var v = w;
            if (typeof w === "undefined") {
                v = x.canvas
            }
            localStorage.setItem(x.uid, v.toDataURL())
        }
        function n(v) {
            if (i() == false || j != true) {
                return null
            }
            l(v);
            o()
        }
        function t(v) {
            if (i() == false || j != true) {
                return null
            }
            localStorage.removeItem(v.uid);
            o()
        }
        function p() {
            if (i() == false || j != true) {
                return null
            }
            localStorage.clear()
        }
        return {
            isAvailable: i,
            activate: m,
            saveHeader: o,
            loadAll: h,
            addFrame: n,
            saveFrame: l,
            removeFrame: t,
            removeAll: p,
            loadCustomColors: s,
            saveCustomColors: u
        }
    }
    function e(l, i, k, j, h) {
        form = new FormData(),
        form.append("upfile", i);
        form.append("stm", Math.floor(l / 1000));
        form.append("etm", Math.floor(new Date().getTime() / 1000));
        form.append("tzo", new Date().getTimezoneOffset());
        form.append("ref", document.referrer);
        form.append("public", formPublic.checked);
        form.append("title", formTitle.value);
        form.append("author", formAuthor.value);
        form.append("nsfw", formNsfw.checked);
        request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            console.log("StateChange: " + request.statusText);
            console.log(request);
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var m = request.responseText;
                    if (typeof j !== "undefined") {
                        j(m)
                    }
                } else {
                    h()
                }
            }
        };
        request.upload.addEventListener("progress",
        function(m) {
            if (typeof k !== "undefined") {
                k(parseInt((m.loaded / m.total * 100)))
            }
        },
        false);
        request.open("POST", "up.php", true);
        request.send(form)
    }
    function b(h) {
        this.uid = i(10);
        this.id = h;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 470;
        this.canvas.height = 470;
        this.canvas.backgroundColor = "#FFFFFF";
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        function i(j) {
            var m = "";
            var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var l = 0; l < j; l++) {
                m += k.charAt(Math.floor(Math.random() * k.length))
            }
            return m
        }
    }
    function d(h, i) {
        this.maxDepth = i;
        this.mainCanvas = h;
        this.frames = new Array();
        this.canUndo = function(j) {
            if (this.frames.length > 0 && this.frames[this.frames.length - 1].frame == j) {
                return true
            }
            return false
        };
        this.addUndo = function(m) {
            var l = {};
            var k = document.createElement("canvas");
            k.width = h.width;
            k.height = h.height;
            var j = k.getContext("2d");
            j.drawImage(h, 0, 0);
            l.canvas = k;
            l.frame = m;
            this.frames.push(l);
            if (this.frames.length > this.maxDepth) {
                this.frames.splice(0, 1)
            }
        };
        this.doUndo = function(m) {
            if (this.canUndo(m)) {
                var j = h.getContext("2d");
                j.clearRect(0, 0, h.width, h.height);
                var l = this.frames[this.frames.length - 1];
                var k = j.globalCompositeOperation;
                j.globalCompositeOperation = "source-over";
                j.drawImage(l.canvas, 0, 0);
                j.globalCompositeOperation = k;
                this.frames.splice(this.frames.length - 1, 1);
                return true
            }
            return false
        }
    }
    function c(h, j, i) {
        this.animator = h;
        this.paperImage = document.getElementById("paperImage");
        this.exportBufferCanvas = document.createElement("canvas");
        this.exportBufferCanvas.width = j;
        this.exportBufferCanvas.height = i;
        this.exportBufferCtx = this.exportBufferCanvas.getContext("2d");
        this.exportBufferCtx.strokeStyle = "#FFFFFF";
        this.exportBufferCtx.fillStyle = "#FFFFFF";
        this.process = function(n, m) {
            var k = new GIF({
                workers: 2,
                quality: 10,
                background: "#ffffff"
            });
            for (var l = 0; l < this.animator.frames.length; l++) {
                this.exportBufferCtx.clearRect(0, 0, this.exportBufferCanvas.width, this.exportBufferCanvas.height);
                this.exportBufferCtx.fillRect(0, 0, this.exportBufferCanvas.width, this.exportBufferCanvas.height);
                this.exportBufferCtx.drawImage(this.paperImage, 0, 0, this.exportBufferCanvas.width, this.exportBufferCanvas.height);
                this.exportBufferCtx.drawImage(this.animator.frames[l].canvas, 0, 0, this.exportBufferCanvas.width, this.exportBufferCanvas.height);
                this.exportBufferCtx.drawImage(wmGfx, this.exportBufferCanvas.width - wmGfx.width, this.exportBufferCanvas.height - wmGfx.height);
                k.addFrame(this.exportBufferCanvas, {
                    delay: this.animator.getDelay(),
                    copy: true
                })
            }
            k.on("finished",
            function(o, p) {
                if (typeof m !== "undefined") {
                    m(o, p)
                }
            });
            k.on("progress",
            function(o) {
                if (typeof n !== "undefined") {
                    n(o * 100)
                }
            });
            k.render()
        }
    }
    function a() {
        this.frames = new Array();
        this.currentFrame = null;
        this.properties = {
            size: 1,
            color: "#000000",
            tool: "pencil",
            delay: 200
        };
        this.paintCanvas = document.getElementById("paintCanvas");
        this.alphaCanvas = document.getElementById("alphaCanvas");
        this.playbackCanvas = document.getElementById("playbackCanvas");
        this.paintCtx = this.paintCanvas.getContext("2d");
        this.alphaCtx = this.alphaCanvas.getContext("2d");
        this.playbackCtx = this.playbackCanvas.getContext("2d");
        this.framesText = document.getElementById("framesText");
        this.paintCtx.lineJoin = "round";
        this.paintCtx.imageSmoothingEnabled = true;
        this.reset = function() {
            this.frames = new Array();
            this.currentFrame = null;
            this.addFrame(0);
            this.setFrame(0);
            this.flushFrame()
        };
        this.recalculateFrames = function() {
            for (var h = 0; h < this.frames.length; h++) {
                this.frames[h].id = h
            }
        };
        this.addFrame = function(i) {
            if (this.frames.length > 0) {
                if (i != null) {
                    if (i < 0) {
                        i = 0
                    }
                    if (i > this.frames.length) {
                        i = this.frames.length - 1
                    }
                } else {
                    i = this.currentFrame.id + 1
                }
            }
            var h = new b(i);
            this.frames.splice(i, 0, h);
            this.recalculateFrames();
            return h
        };
        this.removeFrame = function(h) {
            if (h < 0 || h >= this.frames.length) {
                return false
            }
            this.frames.splice(h, 1);
            if (this.frames.length <= 0) {
                this.addFrame(0)
            }
            this.recalculateFrames();
            return true
        };
        this.setFrame = function(k, i) {
            if (k < 0 || k >= this.frames.length) {
                return null
            }
            if (i != false) {
                this.flushFrame()
            }
            this.currentFrame = this.frames[k];
            this.currentFrame.id = k;
            var h = this.getTool();
            this.setTool("pencil");
            this.paintCtx.clearRect(0, 0, this.paintCanvas.width, this.paintCanvas.height);
            this.paintCtx.drawImage(this.currentFrame.canvas, 0, 0);
            this.setTool(h);
            this.alphaCtx.clearRect(0, 0, this.alphaCanvas.width, this.alphaCanvas.height);
            if (this.frames.length > 1) {
                var j = k - 1;
                if (j < 0) {
                    j = this.frames.length - 1
                }
                this.alphaCtx.drawImage(this.frames[j].canvas, 0, 0)
            }
            this.framesText.innerHTML = (this.currentFrame.id + 1) + "/" + this.frames.length;
            return this.currentFrame
        };
        this.flushFrame = function() {
            if (this.currentFrame != null) {
                this.currentFrame.ctx.clearRect(0, 0, this.currentFrame.canvas.width, this.currentFrame.canvas.height);
                this.currentFrame.ctx.drawImage(this.paintCanvas, 0, 0)
            }
        };
        this.drawPoint = function(j, i, h) {
            this.paintCtx.beginPath();
            this.paintCtx.arc(j, i, this.properties.size / 2 * h, 0, 2 * Math.PI, false);
            this.paintCtx.fill()
        };
        this.drawLine = function(l, k, i, h, j) {
            this.paintCtx.lineWidth = this.properties.size * j;
            this.paintCtx.beginPath();
            this.paintCtx.moveTo(l, k);
            this.paintCtx.lineTo(i, h);
            this.paintCtx.closePath();
            this.paintCtx.stroke();
            this.paintCtx.lineWidth = this.properties.size
        };
        this.setPenSize = function(h) {
            this.paintCtx.lineWidth = h;
            this.properties.size = h
        };
        this.setPenColor = function(h) {
            this.paintCtx.strokeStyle = h;
            this.paintCtx.fillStyle = h;
            this.properties.color = h
        };
        this.setTool = function(h) {
            if (h == "pencil") {
                this.paintCtx.globalCompositeOperation = "source-over";
                this.properties.tool = h
            } else {
                if (h == "eraser") {
                    this.paintCtx.globalCompositeOperation = "destination-out";
                    this.properties.tool = h
                } else {
                    if (h == "marker") {
                        this.paintCtx.globalCompositeOperation = "darken";
                        this.properties.tool = h
                    } else {
                        if (h == "filler") {
                            this.paintCtx.globalCompositeOperation = "source-atop";
                            this.properties.tool = h
                        } else {
                            if (h == "paintbrush") {
                                this.paintCtx.globalCompositeOperation = "overlay";
                                this.properties.tool = h
                            } else {
                                this.paintCtx.globalCompositeOperation = "source-over";
                                this.properties.tool = "pencil"
                            }
                        }
                    }
                }
            }
        };
        this.setDelay = function(h) {
            this.properties.delay = h
        };
        this.getPenSize = function() {
            return this.properties.size
        };
        this.getPenColor = function() {
            return this.properties.color
        };
        this.getTool = function() {
            return this.properties.tool
        };
        this.getDelay = function() {
            return this.properties.delay
        };
        this.hasMaxFrames = function() {
            return false
        };
        this.milisLeft = 0;
        this.playbackFrame = 0;
        this.processPlayback = function(h) {
            this.milisLeft -= h;
            if (this.milisLeft <= 0) {
                this.playbackFrame++;
                if (this.playbackFrame >= this.frames.length) {
                    this.playbackFrame = 0
                }
                this.playbackCtx.drawImage(paperImage, 0, 0);
                this.playbackCtx.drawImage(this.frames[this.playbackFrame].canvas, 0, 0);
                this.milisLeft = this.properties.delay
            }
        };
        this.resetPlayback = function(h) {
            if (typeof h !== "undefined") {
                this.playbackCtx = h.getContext("2d")
            }
            this.flushFrame();
            this.milisLeft = -1;
            this.playbackFrame = -1;
            this.processPlayback(1)
        };
        this.reset()
    }
    new f(new a())
})();