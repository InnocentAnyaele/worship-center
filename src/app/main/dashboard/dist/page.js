"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var auto_1 = require("chart.js/auto");
var react_chartjs_2_1 = require("react-chartjs-2");
var chart_js_1 = require("chart.js");
auto_1["default"].register(chart_js_1.CategoryScale);
auto_1["default"].defaults.scale.grid.display = false;
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("@/lib/firebase");
var react_1 = require("react");
function Dashboard() {
    // let growthYear = 2023;
    var _a = react_1.useState(new Date().getFullYear().toString()), growthYear = _a[0], setGrowthYear = _a[1];
    var labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var _b = react_1.useState(null), members = _b[0], setMembers = _b[1];
    var data = {
        labels: labels,
        datasets: [
            {
                label: "Membership growth for " + growthYear,
                backgroundColor: "rgb(74, 90, 234)",
                borderColor: "rgb(74, 90, 234)",
                data: members,
                fill: false
            },
        ]
    };
    var _c = react_1.useState(null), memberCount = _c[0], setMemberCount = _c[1];
    var _d = react_1.useState(null), departmentCount = _d[0], setDepartmentCount = _d[1];
    var _e = react_1.useState(null), offeringCount = _e[0], setOfferingCount = _e[1];
    var _f = react_1.useState(null), contributionCount = _f[0], setContributionCount = _f[1];
    var _g = react_1.useState(null), offeringDate = _g[0], setOfferingDate = _g[1];
    var _h = react_1.useState(null), titheCount = _h[0], setTitheCount = _h[1];
    var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var currMonth = new Date().getMonth();
    var currYear = new Date().getFullYear();
    function getMembers() {
        return __awaiter(this, void 0, void 0, function () {
            var monthSum, dptCount, memberRef, snapshots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        monthSum = {
                            January: 0,
                            February: 0,
                            March: 0,
                            April: 0,
                            May: 0,
                            June: 0,
                            July: 0,
                            August: 0,
                            September: 0,
                            October: 0,
                            November: 0,
                            December: 0
                        };
                        dptCount = {
                            "Men Ministry": 0,
                            "Women Ministry": 0,
                            "Youth Ministry": 0,
                            "Children Ministry": 0
                        };
                        memberRef = firestore_1.collection(firebase_1.db, "members");
                        return [4 /*yield*/, firestore_1.getDocs(memberRef).then(function (snapshots) {
                                setMemberCount(snapshots.docs.length);
                                snapshots.docs.map(function (doc) {
                                    var data = doc.data();
                                    var dpt = data.department;
                                    dptCount[dpt] = dptCount[dpt] + 1;
                                    var dateOfFirstVisit = new Date(data.dateOfFirstVisit);
                                    var yearOfFistVisit = dateOfFirstVisit.getFullYear().toString();
                                    var monthOfFirstVisit = monthNames[dateOfFirstVisit.getMonth()];
                                    console.log("year of first visit", yearOfFistVisit);
                                    console.log("month of first visit", monthOfFirstVisit);
                                    if (yearOfFistVisit == growthYear) {
                                        monthSum[monthOfFirstVisit] = monthSum[monthOfFirstVisit] + 1;
                                    }
                                });
                            })];
                    case 1:
                        snapshots = _a.sent();
                        // setMembers([5,10,20,20, 30, 40, 50, 60, 50, 40 , 20, 20])
                        setMembers(Object.values(monthSum).slice(0, currMonth + 1));
                        console.log(monthSum);
                        console.log(Object.values(monthSum).slice(0, currMonth + 1));
                        setDepartmentCount(dptCount);
                        return [2 /*return*/];
                }
            });
        });
    }
    function generateYears() {
        var years = [];
        for (var year = 2018; year <= 2030; year++) {
            years.push(year);
        }
        return years;
    }
    var selectYear = generateYears();
    function getOffering() {
        return __awaiter(this, void 0, void 0, function () {
            var offeringSum, offeringRef, offeringRefQuery, count, snapshots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        offeringSum = 0;
                        offeringRef = firestore_1.collection(firebase_1.db, "offering");
                        offeringRefQuery = firestore_1.query(offeringRef, firestore_1.orderBy("date", "desc"));
                        count = 0;
                        return [4 /*yield*/, firestore_1.getDocs(offeringRefQuery).then(function (snapshots) {
                                var offeringDocs = snapshots.docs.map(function (doc) {
                                    var data = doc.data();
                                    var offeringDate = new Date(data.date);
                                    var offeringYear = offeringDate.getFullYear();
                                    if (offeringYear == currYear) {
                                        offeringSum = offeringSum + data.amount;
                                    }
                                    return data;
                                });
                                setOfferingCount(offeringSum);
                            })];
                    case 1:
                        snapshots = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function getcontribution() {
        return __awaiter(this, void 0, void 0, function () {
            var contributionSumForTheYear, contributionRef, snapshots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contributionSumForTheYear = 0;
                        contributionRef = firestore_1.collection(firebase_1.db, "contribution");
                        return [4 /*yield*/, firestore_1.getDocs(contributionRef).then(function (snapshots) {
                                snapshots.docs.map(function (doc) {
                                    var data = doc.data();
                                    var contributionDate = new Date(data.date);
                                    var contributionYear = contributionDate.getFullYear();
                                    if (contributionYear == currYear) {
                                        contributionSumForTheYear = contributionSumForTheYear + data.amount;
                                    }
                                });
                                setContributionCount(contributionSumForTheYear);
                                // console.log('contribution sum for the year', contributionSumForTheYear)
                            })];
                    case 1:
                        snapshots = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function getTithe() {
        return __awaiter(this, void 0, void 0, function () {
            var titheSum, titheRef, titheRefQuery, snapshots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        titheSum = 0;
                        titheRef = firestore_1.collection(firebase_1.db, "tithe");
                        titheRefQuery = firestore_1.query(titheRef, firestore_1.orderBy("dateAdded", "desc"));
                        return [4 /*yield*/, firestore_1.getDocs(titheRefQuery).then(function (snapshots) {
                                var docs = snapshots.docs.map(function (doc) {
                                    var data = doc.data();
                                    data.id = doc.id;
                                    var titheDate = new Date(data.date);
                                    var titheYear = titheDate.getFullYear();
                                    if (titheYear == currYear) {
                                        titheSum = titheSum + data.amount;
                                    }
                                });
                                setTitheCount(titheSum);
                            })];
                    case 1:
                        snapshots = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var row1content = [
        {
            title: "total members",
            figure: memberCount || memberCount == 0 ? memberCount : "loading"
        },
        {
            title: "offetory " + currYear,
            figure: offeringCount || offeringCount == 0
                ? "GHS " + offeringCount
                : "loading"
        },
        {
            title: "project " + currYear,
            figure: contributionCount || contributionCount == 0
                ? "GHS " + contributionCount
                : "loading"
        },
        {
            title: "tithe",
            figure: titheCount || titheCount == 0 ? "GHS " + titheCount : "loading"
        },
    ];
    var col1content = [
        {
            title: "Men Ministry",
            figure: departmentCount ? departmentCount["Men Ministry"] : "loading"
        },
        {
            title: "Women Ministry",
            figure: departmentCount ? departmentCount["Women Ministry"] : "loading"
        },
        {
            title: "Youth Ministry",
            figure: departmentCount ? departmentCount["Youth Ministry"] : "loading"
        },
        {
            title: "Children ministry",
            figure: departmentCount
                ? departmentCount["Children Ministry"]
                : "loading"
        },
    ];
    react_1.useEffect(function () {
        getMembers();
        getOffering();
        getcontribution();
        getTithe();
    }, [growthYear]);
    return (React.createElement("main", { className: "font-sans h-screen w-screen flex flex-col md:px-40 lg:px-40 " },
        React.createElement("div", { className: "flex flex-row justify-between flex-wrap" }, row1content.map(function (content, index) { return (React.createElement("div", { key: index, className: "p-3 bg-gradient-to-r from-[#6E45E2] to-[#88D3CE] rounded-lg text-white my-5 w-screen md:w-auto lg:w-auto m-10" },
            React.createElement("div", { className: "flex flex-col md:items-center lg:items-center md:mx-10 lg:mx-10 my-4 md:my-0 lg:my-0" },
                React.createElement("span", { className: "font-bold text-lg my-4" },
                    " ",
                    content.figure,
                    " "),
                React.createElement("span", { className: "text-sm mt-4" },
                    content.title,
                    " ")))); })),
        React.createElement("div", { className: "flex flex-row justify-center md:mt-10 lg:mt-10 flex-wrap" },
            React.createElement("div", { className: "flex flex-col w-[100vh] md:h-96 lg-h-96 bg-col m-10 md:m-0 lg:m-0" },
                React.createElement("span", { className: "font-bold mb-10" }, "Membership growth for " + growthYear),
                React.createElement("select", { className: "border rounded w-[65px]", name: "selectYear", value: growthYear, onChange: function (e) { return setGrowthYear(e.target.value); } }, selectYear.map(function (yr, idx) { return (React.createElement("option", { key: idx, value: yr }, yr)); })),
                React.createElement(react_chartjs_2_1.Line, { data: data })),
            React.createElement("div", { className: "flex flex-col items-center self-end h-full pt-10 md:ml-auto lg:ml-auto" }, col1content.map(function (content, index) { return (React.createElement("div", { key: index, className: "flex flex-col items-center" },
                React.createElement("span", { className: "font-bold text-lg" },
                    " ",
                    content.figure,
                    " "),
                React.createElement("span", { className: "text-sm m-4" },
                    content.title,
                    " "))); })))));
}
exports["default"] = Dashboard;
