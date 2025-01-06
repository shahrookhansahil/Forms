import React, { useState } from "react";
import AuditControlValves from "./AuditControlValves";
import SteamTrapAuditList from "./SteamTrapAuditList";
import PortableElectricalEquipmentAudit from "./PortableElectricalEquipmentAudit";
import SealWaterAuditForm from "./SealWaterAuditForm";
import RotaryEquipment from "./RotaryEquipment";
import SafetyEquipmentAuditForm from "./SafetyEquipmentAuditForm";
import SealWaterSupplyAudit from "./SealWaterSupplyAudit";

// independent Forms
import ReliefStreamAudit from "./independent/ReliefStreamAudit";
import ElectricalAuditArea from "./independent/ElectricalAuditArea";
import AuditOfEndBank from "./independent/AuditOfEndBank";
import MechanicalAuditOfArea from "./independent/MechanicalAuditOfArea";
import HoseInspectionForm from "./independent/HoseInspectionForm";
import RoutineAreaHosesAudit from "./independent/RoutineAreaHosesAudit";
import HouseKeepingCheckSheet from "./independent/HouseKeepingCheckSheet";
export default function App() {
	const [selectedForm, setSelectedForm] = useState("ReliefStreamAudit");

	const dependentforms = [
		{ value: "AuditControlValves", label: "Audit Control Valves Form" },
		{
			value: "PortableElectricalEquipmentAudit",
			label: "Portable Electrical Equipment Audit",
		},
		{
			value: "SealWaterAuditForm",
			label: "Pumps and Agitators Seal Water ",
		},
		{ value: "RotaryEquipment", label: "Rotary Equipment Form" },
		{
			value: "SealWaterSupplyAudit",
			label: "Audit of area for Seal Water",
		},
		{ value: "SteamTrapAuditList", label: "Steam Trap Audit List" },
		{ value: "SafetyEquipmentAuditForm", label: "Safety Equipment Audit Form" },
	];

	const independentForms = [
		{ value: "ReliefStreamAudit", label: "Relief Stream Audit" },
		{ value: "ElectricalAuditArea", label: "Electrical Audit Area" },
		{ value: "AuditOfEndBank", label: "Audit of End Bank" },
		{ value: "MechanicalAuditOfArea", label: "Mechanical Audit Of Area" },
		{ value: "HoseInspectionForm", label: "Hose Inspection Form" },
		{ value: "RoutineAreaHosesAudit", label: "Routine Area Hoses Audit" },
		{ value: "HouseKeepingCheckSheet", label: "House Keeping Check Sheet" },
	];

	return (
		<div style={{ padding: "20px" }}>
			<div className="mb-4 w-72">
				<label htmlFor="form-select" className="block text-sm font-medium mb-2">
					Select a Form:
				</label>
				<select
					id="form-select"
					value={selectedForm}
					onChange={(e) => setSelectedForm(e.target.value)}
					className="p-2 border border-gray-300 rounded-md w-full"
				>
					{dependentforms.map((form) => (
						<option key={form.value} value={form.value}>
							{form.label}
						</option>
					))}
				</select>
			</div>
			{selectedForm === "PortableElectricalEquipmentAudit" && (
				<PortableElectricalEquipmentAudit />
			)}
			{selectedForm === "SteamTrapAuditList" && <SteamTrapAuditList />}
			{selectedForm === "AuditControlValves" && <AuditControlValves />}
			{selectedForm === "SealWaterAuditForm" && <SealWaterAuditForm />}
			{selectedForm === "RotaryEquipment" && <RotaryEquipment />}
			{selectedForm === "SafetyEquipmentAuditForm" && (
				<SafetyEquipmentAuditForm />
			)}
			{selectedForm === "SealWaterSupplyAudit" && <SealWaterSupplyAudit />}

			{/* independent forms */}
			{selectedForm === "ReliefStreamAudit" && <ReliefStreamAudit />}
			{selectedForm === "ElectricalAuditArea" && <ElectricalAuditArea />}
			{selectedForm === "AuditOfEndBank" && <AuditOfEndBank />}
			{selectedForm === "MechanicalAuditOfArea" && <MechanicalAuditOfArea />}
			{selectedForm === "HoseInspectionForm" && <HoseInspectionForm />}
			{selectedForm === "RoutineAreaHosesAudit" && <RoutineAreaHosesAudit />}
			{selectedForm === "HouseKeepingCheckSheet" && <HouseKeepingCheckSheet />}
		</div>
	);
}
