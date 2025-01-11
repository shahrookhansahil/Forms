import React, { useState } from "react";

// Import all form components
import AuditControlValves from "./AuditControlValves.tsx";
import SteamTrapAuditList from "./SteamTrapAuditList.tsx";
import PortableElectricalEquipmentAudit from "./PortableElectricalEquipmentAudit.tsx";
import SealWaterAuditForm from "./SealWaterAuditForm.tsx";
import RotaryEquipment from "./RotaryEquipment.tsx";
import SafetyEquipmentAuditForm from "./SafetyEquipmentAuditForm.tsx";
import SealWaterSupplyAudit from "./SealWaterSupplyAudit.tsx";
import ReliefStreamAudit from "./independent/ReliefStreamAudit.tsx";
import ElectricalAuditArea from "./independent/ElectricalAuditArea.tsx";
import AuditOfEndBank from "./independent/AuditOfEndBank.tsx";
import MechanicalAuditOfArea from "./independent/MechanicalAuditOfArea.tsx";
import HoseInspectionForm from "./independent/HoseInspectionForm.tsx";
import RoutineAreaHosesAudit from "./independent/RoutineAreaHosesAudit.tsx";
import HouseKeepingCheckSheet from "./independent/HouseKeepingCheckSheet.tsx";

// Define the type for form options
interface FormOption {
	value: string;
	label: string;
}

const App: React.FC = () => {
	const [selectedForm, setSelectedForm] = useState<string>("ReliefStreamAudit");

	// Define the dependent and independent forms
	const dependentForms: FormOption[] = [
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

	const independentForms: FormOption[] = [
		{ value: "ReliefStreamAudit", label: "Relief Stream Audit" },
		{ value: "ElectricalAuditArea", label: "Electrical Audit Area" },
		{ value: "AuditOfEndBank", label: "Audit of End Bank" },
		{ value: "MechanicalAuditOfArea", label: "Mechanical Audit Of Area" },
		{ value: "HoseInspectionForm", label: "Hose Inspection Form" },
		{ value: "RoutineAreaHosesAudit", label: "Routine Area Hoses Audit" },
		{ value: "HouseKeepingCheckSheet", label: "House Keeping Check Sheet" },
	];

	return (
		<div className="p-16">
			{/* Dropdown to select a form */}
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
					{/* Render options for dependent forms */}
					{dependentForms.map((form) => (
						<option key={form.value} value={form.value}>
							{form.label}
						</option>
					))}
					{/* Render options for independent forms */}
					{independentForms.map((form) => (
						<option key={form.value} value={form.value}>
							{form.label}
						</option>
					))}
				</select>
			</div>

			{/* Conditionally render the selected form */}
			{selectedForm === "AuditControlValves" && <AuditControlValves />}
			{selectedForm === "PortableElectricalEquipmentAudit" && (
				<PortableElectricalEquipmentAudit />
			)}
			{selectedForm === "SealWaterAuditForm" && <SealWaterAuditForm />}
			{selectedForm === "RotaryEquipment" && <RotaryEquipment />}
			{selectedForm === "SafetyEquipmentAuditForm" && (
				<SafetyEquipmentAuditForm />
			)}
			{selectedForm === "SealWaterSupplyAudit" && <SealWaterSupplyAudit />}
			{selectedForm === "SteamTrapAuditList" && <SteamTrapAuditList />}

			{/* Independent Forms */}
			{selectedForm === "ReliefStreamAudit" && <ReliefStreamAudit />}
			{selectedForm === "ElectricalAuditArea" && <ElectricalAuditArea />}
			{selectedForm === "AuditOfEndBank" && <AuditOfEndBank />}
			{selectedForm === "MechanicalAuditOfArea" && <MechanicalAuditOfArea />}
			{selectedForm === "HoseInspectionForm" && <HoseInspectionForm />}
			{selectedForm === "RoutineAreaHosesAudit" && <RoutineAreaHosesAudit />}
			{selectedForm === "HouseKeepingCheckSheet" && <HouseKeepingCheckSheet />}
		</div>
	);
};

export default App;
