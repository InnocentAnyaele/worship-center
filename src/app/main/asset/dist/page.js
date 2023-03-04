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
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var react_1 = require("@headlessui/react");
var react_2 = require("react");
var google_1 = require("@next/font/google");
var ExportData_1 = require("@/components/exportData/ExportData");
var montserrat = google_1.Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat"
});
var firestore_1 = require("firebase/firestore");
var firebase_1 = require("@/lib/firebase");
var AddAsset_1 = require("@/components/addAsset/AddAsset");
function Asset() {
    var _this = this;
    var _a = react_2.useState(false), isAddAssetOpen = _a[0], setIsAddAssetOpen = _a[1];
    var _b = react_2.useState(false), isViewAssetOpen = _b[0], setIsViewAssetOpen = _b[1];
    var _c = react_2.useState(""), search = _c[0], setSearch = _c[1];
    var _d = react_2.useState("name"), searchBy = _d[0], setSearchBy = _d[1];
    var _e = react_2.useState(null), assetData = _e[0], setAssetData = _e[1];
    //   const [viewAssetData, setViewAssetData] = useState<any>("");
    var _f = react_2.useState(null), exportData = _f[0], setExportData = _f[1];
    var _g = react_2.useState(false), deleteModal = _g[0], setDeleteModal = _g[1];
    var _h = react_2.useState(""), deleteID = _h[0], setDeleteID = _h[1];
    var _j = react_2.useState(""), deleteError = _j[0], setDeleteError = _j[1];
    function openDeleteModal(id) {
        setDeleteID(id);
        setDeleteModal(true);
    }
    function closeDeleteModal() {
        setDeleteID("");
        setDeleteModal(false);
    }
    function closeAddAssetModal() {
        setIsAddAssetOpen(false);
    }
    function openAddAssetModal() {
        setIsAddAssetOpen(true);
    }
    function closeViewAssetModal() {
        setIsViewAssetOpen(false);
    }
    function openViewAssetModal() {
        setIsViewAssetOpen(false);
    }
    function uploadActivity() {
        try {
            var activityRef = firestore_1.collection(firebase_1.db, "activity");
            var owner = localStorage.getItem("userEmail");
            var date = new Date();
            var options = { hour: "numeric", minute: "2-digit" };
            var currTime = date.toLocaleTimeString("en-US", options);
            var activity = "Delete";
            firestore_1.addDoc(activityRef, {
                resource: "Asset",
                activity: activity,
                owner: owner,
                date: new Date(),
                time: currTime
            })
                .then(function () {
                window.location.reload();
            })["catch"](function (error) {
                setDeleteError("Could not delete");
            });
        }
        catch (error) {
            setDeleteError("Could not delete");
        }
    }
    function deleteHandler() {
        var docRef = firestore_1.doc(firebase_1.db, "asset", deleteID);
        firestore_1.deleteDoc(docRef)
            .then(function () {
            console.log("deleted");
            // setDeleteError('')
            // window.location.reload();
            uploadActivity();
        })["catch"](function (err) {
            console.log(err);
            setDeleteError("Could not delete");
        });
    }
    react_2.useEffect(function () {
        var fetchAssetData = function () { return __awaiter(_this, void 0, void 0, function () {
            var exportDataTmp, assetRef, assetRefQuery, snapshots;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exportDataTmp = [
                            [
                                "Name",
                                "Type",
                                "Model",
                                "Serial Number",
                                "Tag Number",
                                "Location",
                                "Date purchased",
                            ],
                        ];
                        assetRef = firestore_1.collection(firebase_1.db, "asset");
                        assetRefQuery = firestore_1.query(assetRef, firestore_1.orderBy("purchaseDate", "desc"));
                        return [4 /*yield*/, firestore_1.getDocs(assetRefQuery).then(function (snapshots) {
                                var docs = snapshots.docs.map(function (doc) {
                                    var data = doc.data();
                                    exportDataTmp.push([
                                        data.name,
                                        data.type,
                                        data.model,
                                        data.serialNo,
                                        data.tagNo,
                                        data.location,
                                        data.purchaseDate,
                                    ]);
                                    data.id = doc.id;
                                    return data;
                                });
                                setAssetData(docs);
                                setExportData(exportDataTmp);
                            })];
                    case 1:
                        snapshots = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        fetchAssetData();
    }, []);
    function searchHandler() {
        return __awaiter(this, void 0, void 0, function () {
            var assetRef, assetRefQuery, snapshots, docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!search) return [3 /*break*/, 2];
                        assetRef = firestore_1.collection(firebase_1.db, "asset");
                        assetRefQuery = firestore_1.query(assetRef, firestore_1.where(searchBy, "==", search));
                        return [4 /*yield*/, firestore_1.getDocs(assetRefQuery)];
                    case 1:
                        snapshots = _a.sent();
                        docs = snapshots.docs.map(function (doc) {
                            var data = doc.data();
                            data.id = doc.id;
                            return data;
                        });
                        console.log(docs);
                        setAssetData(docs);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("div", { className: "flex m-3 flex-col justify-center py-10 md:px-40 lg:px-40 flex-wrap w-[100%]" },
        React.createElement(react_1.Transition, { appear: true, show: isAddAssetOpen, as: react_2.Fragment },
            React.createElement(react_1.Dialog, { as: "div", className: montserrat.variable + " font-sans relative z-10 text-sm", onClose: closeAddAssetModal },
                React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                    React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25" })),
                React.createElement("div", { className: "fixed inset-0 overflow-y-auto" },
                    React.createElement("div", { className: "flex min-h-full items-center justify-center p-4 text-center" },
                        React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95" },
                            React.createElement(react_1.Dialog.Panel, { className: "transform min-w-[30%] text-left overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all" },
                                React.createElement(react_1.Dialog.Title, { as: "h3", className: "text-lg font-bold leading-6 text-gray-900" }, "Add Asset"),
                                React.createElement(AddAsset_1["default"], null))))))),
        React.createElement(react_1.Transition, { appear: true, show: deleteModal, as: react_2.Fragment },
            React.createElement(react_1.Dialog, { as: "div", className: montserrat.variable + " font-sans relative z-10 text-sm", onClose: closeDeleteModal },
                React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "ease-in duration-200", leaveFrom: "opacity-100", leaveTo: "opacity-0" },
                    React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-25" })),
                React.createElement("div", { className: "fixed inset-0 overflow-y-auto" },
                    React.createElement("div", { className: "flex min-h-full items-center justify-center p-4 text-center" },
                        React.createElement(react_1.Transition.Child, { as: react_2.Fragment, enter: "ease-out duration-300", enterFrom: "opacity-0 scale-95", enterTo: "opacity-100 scale-100", leave: "ease-in duration-200", leaveFrom: "opacity-100 scale-100", leaveTo: "opacity-0 scale-95" },
                            React.createElement(react_1.Dialog.Panel, { className: "text-center transform w-auto overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all" },
                                React.createElement(react_1.Dialog.Title, { as: "h3", className: "text-lg text-center font-bold leading-6 text-gray-900" }, "Are you sure you want to delete?"),
                                React.createElement("div", { className: "m-5 space-x-3" },
                                    React.createElement("button", { className: "bg-[#c16161] px-6 py-2 rounded", onClick: deleteHandler },
                                        React.createElement("span", { className: "text-white text-sm" }, "Yes")),
                                    React.createElement("button", { className: "bg-[#789e56] px-6 py-2 rounded", onClick: closeDeleteModal },
                                        React.createElement("span", { className: "text-white text-sm" }, "No"))))))))),
        React.createElement("div", { className: "flex flex-row justify-between flex-wrap" },
            React.createElement("div", { className: "flex flex-row space-x-2" },
                React.createElement("div", { className: "rounded border-2 h-10" },
                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { className: "px-2", icon: free_solid_svg_icons_1.faSearch, onClick: searchHandler }),
                    React.createElement("input", { className: "h-full p-2", placeholder: "Search by " + searchBy, name: "search", value: search, onChange: function (e) { return setSearch(e.target.value); }, type: "text" })),
                React.createElement("select", { className: "p-2 rounded w-[auto]", name: "selectYear", value: searchBy, onChange: function (e) { return setSearchBy(e.target.value); } },
                    React.createElement("option", { value: "name" }, "Search by Asset Name"),
                    React.createElement("option", { value: "type" }, "Search by Asset Type"),
                    React.createElement("option", { value: "model" }, "Search by Model"),
                    React.createElement("option", { value: "serialNo" }, "Search by Serial Number"),
                    React.createElement("option", { value: "tagNo" }, "Search by Tag Number"),
                    React.createElement("option", { value: "location" }, "Search by Location"),
                    React.createElement("option", { value: "date" }, "Search by Date"))),
            React.createElement("div", { className: "flex flex-col items-center" },
                React.createElement("button", { className: "bg-[#8B7E74] px-2 h-10 rounded w-40  md:my-0 lg:my-0", onClick: function () { return openAddAssetModal(); } },
                    React.createElement("span", { className: "text-white text-sm" }, "Add Asset")))),
        exportData && React.createElement(ExportData_1["default"], { data: exportData }),
        deleteError && (React.createElement("div", { className: "text-center text-sm font-regular text-white bg-red-400 border p-1 rounded my-5" },
            React.createElement("span", null, deleteError))),
        React.createElement("table", { className: "mt-10 border-separate table-auto border-spacing-y-[20px]  text-[15px] w-[100%] flex-wrap text-sm" },
            React.createElement("thead", { className: "text-[#B2B2B2]" },
                React.createElement("tr", { className: "text-left" },
                    React.createElement("th", null, "No."),
                    React.createElement("th", null, "Asset Name"),
                    React.createElement("th", null, "Asset Type"),
                    React.createElement("th", null, "Model"),
                    React.createElement("th", null, "Serial Number"),
                    React.createElement("th", null, "Tag Number"),
                    React.createElement("th", null, "Location"),
                    React.createElement("th", null, "Date"),
                    React.createElement("th", null))),
            assetData ? (React.createElement("tbody", null, assetData.map(function (data, index) { return (React.createElement("tr", { key: data.id },
                React.createElement("td", null, index + 1),
                React.createElement("td", null, data.name),
                React.createElement("td", null, data.type),
                React.createElement("td", null, data.model),
                React.createElement("td", null, data.serialNo),
                React.createElement("td", null, data.tagNo),
                React.createElement("td", null, data.location),
                React.createElement("td", null, data.purchaseDate),
                React.createElement("td", null,
                    React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faTrash, color: "red", onClick: function () { return openDeleteModal(data.id); } })))); }))) : (React.createElement("div", { className: "mt-5 text-[#B2B2B2]" },
                React.createElement("span", null, "Loading asset data..."))))));
}
exports["default"] = Asset;
