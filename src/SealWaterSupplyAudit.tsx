import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import InputSelectField from "./InputSelectField.tsx";
import { operators, equipmentWaterSupplyData } from "./fakeData";
import Select from "react-select";
import * as Yup from "yup";

const equipmentData = equipmentWaterSupplyData.map((equipment) => ({
	serialNo: equipment.serialNo,
	equipmentNo: equipment.equipmentNo,
	inletFlow: "",
	outletFlow: "",
	difference: "",
}));

const SealWaterAuditForm = () => {
	const equipmentOptions = equipmentData.map((equipment) => ({
		value: equipment.serialNo,
		label: `${equipment.equipmentNo}`,
	}));
	const validationSchema = Yup.object().shape({
		group: Yup.string().required("Group is required"),
		shift: Yup.string().required("Shift is required"),
		date: Yup.date().required("Date is required"),
		revisionDate: Yup.date().required("Revision Date is required"),
		selectedEquipments: Yup.array()
			.of(Yup.string().required("Equipment selection is required"))
			.min(1, "At least one equipment must be selected")
			.required("Equipment selection is required"),
		equipmentData: Yup.array()
			.of(
				Yup.object().shape({
					serialNo: Yup.string().required("Serial Number is required"),
					equipmentNo: Yup.string().required("Equipment Number is required"),
					inletFlow: Yup.number()
						.typeError("Inlet Flow must be a number")
						.required("Inlet Flow is required"),
					outletFlow: Yup.number()
						.typeError("Outlet Flow must be a number")
						.required("Outlet Flow is required"),
					difference: Yup.number()
						.typeError("Difference must be a number")
						.required("Difference is required"),
					remarks: Yup.string().required("Remarks are required"),
				})
			)
			.required("Equipment data is required")
			.min(1, "At least one equipment data entry is required"),
		remarks: Yup.string().required("Remarks are required"),
		pac_dying: Yup.string().required("PAC Dying is required"),
		sol_rec: Yup.string().required("SOL REC is required"),
		reaction: Yup.string().required("Reaction is required"),
		shift_manager: Yup.string().required("Shift Manager is required"),
	});
	return (
		<Formik
			initialValues={{
				group: "",
				shift: "",
				date: "",
				revisionDate: "",
				selectedEquipments: [],
				equipmentData: [],
				remarks: "",
				pac_dying: "",
				sol_rec: "",
				reaction: "",
				shift_manager: "",
			}}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log("Form Values:", values);
			}}
		>
			{({ values, errors, touched, setFieldValue }) => (
				<Form className="p-4 space-y-6">
					<div className="space-y-4 border-b-2 border-gray-200 pb-8">
						<h2 className="text-xl font-bold text-center">
							AUDIT OF AREA FOR SEAL WATER SUPPLY & RETURN{" "}
						</h2>
						<div className="grid grid-cols-3 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Shift Group
								</label>
								<Field
									as="select"
									name="group"
									className="p-2 border border-gray-300 rounded-md w-full"
								>
									<option value="" disabled>
										Select a group
									</option>
									<option value="Group A">Group A</option>
									<option value="Group B">Group B</option>
									<option value="Group C">Group C</option>
								</Field>
								{touched.group && errors.group && (
									<div className="text-danger text-sm">{errors.group}</div>
								)}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Shift
								</label>
								<Field
									as="select"
									name="shift"
									className="p-2 border border-gray-300 rounded-md w-full"
								>
									<option value="" disabled>
										Select a Shift
									</option>
									<option value="Morning">Morning</option>
									<option value="Evening">Evening</option>
									<option value="Night">Night</option>
								</Field>
								{touched.shift && errors.shift && (
									<div className="text-danger text-sm">{errors.shift}</div>
								)}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Date & Time
								</label>
								<Field
									name="date"
									type="datetime-local"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.time && errors.time && (
									<div className="text-danger text-sm">{errors.time}</div>
								)}
							</div>
						</div>
						<div>
							{/* Multi-Select Dropdown */}
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Select Equipment
							</label>
							<Select
								isMulti
								name="selectedEquipments"
								options={equipmentOptions}
								onChange={(selectedOptions) => {
									const selectedValues = selectedOptions.map(
										(option) => option.value
									);
									setFieldValue("selectedEquipments", selectedValues);

									// Filter the equipmentData based on the selected serial numbers
									setFieldValue(
										"equipmentData",
										equipmentData.filter((equipment) =>
											selectedValues.includes(equipment.serialNo)
										)
									);
								}}
								value={equipmentOptions.filter((option) =>
									values.selectedEquipments?.includes(option.value)
								)}
							/>
						</div>
					</div>
					<FieldArray name="equipmentData">
						{({ remove }) => (
							<div className="space-y-6">
								{values.equipmentData.map((data, index) => (
									<div key={index} className="pt-1">
										<div className="grid grid-cols-7 gap-4 mt-4">
											{index === 0 && (
												<>
													<div>
														<label
															htmlFor={`equipmentData[${index}].serialNo`}
															className="block text-sm font-medium text-gray-700 "
														>
															S. No.
														</label>
													</div>
													<div>
														<label
															htmlFor={`equipmentData[${index}].equipmentNo`}
															className="block text-sm font-medium text-gray-700 "
														>
															Equipment No.
														</label>
													</div>

													<div>
														<label
															htmlFor={`equipmentData[${index}].inletFlow`}
															className="block text-sm font-medium text-gray-700"
														>
															SEAL WATER Inlet Flow
														</label>
													</div>
													<div>
														<label
															htmlFor={`equipmentData[${index}].outletFlow`}
															className="block text-sm font-medium text-gray-700"
														>
															SEAL WATER Outlet Flow
														</label>
													</div>

													<div>
														<label
															htmlFor={`equipmentData[${index}].difference`}
															className="block text-sm font-medium text-gray-700 "
														>
															Difference{" "}
														</label>
													</div>

													<div className="col-span-2">
														<label
															htmlFor={`equipmentData[${index}].remarks`}
															className="block text-sm font-medium text-gray-700 "
														>
															Remarks
														</label>
													</div>
												</>
											)}
											<div>
												<Field
													name={`equipmentData[${index}].serialNo`}
													placeholder="Enter S. No."
													className="p-2 border border-gray-300 rounded-md w-full"
												/>
											</div>
											<div>
												<Field
													name={`equipmentData[${index}].equipmentNo`}
													placeholder="Enter Equipment No."
													className="p-2 border border-gray-300 rounded-md w-full"
												/>
											</div>
											<div>
												<Field
													name={`equipmentData[${index}].inletFlow`}
													placeholder="Enter Inlet Flow"
													className="p-2 border border-gray-300 rounded-md w-full "
												/>
											</div>
											<div>
												<Field
													name={`equipmentData[${index}].outletFlow`}
													placeholder="Enter Outlet Flow"
													className="p-2 border border-gray-300 rounded-md w-full "
												/>
											</div>
											<div>
												<Field
													name={`equipmentData[${index}].difference`}
													placeholder="Enter Kg/hr (Inlet)"
													className="p-2 border border-gray-300 rounded-md w-full"
												/>
											</div>

											<div className="col-span-2 flex items-center space-x-4">
												<Field
													name={`equipmentData[${index}].remarks`}
													placeholder="Enter Remarks"
													className="p-2 border border-gray-300 rounded-md w-full"
												/>
												<button
													type="button"
													className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
													onClick={() => {
														remove(index);
														// Remove the corresponding equipment from selectedEquipments as well
														const updatedSelectedEquipments =
															values.selectedEquipments.filter(
																(value) => value !== data.serialNo
															);
														setFieldValue(
															"selectedEquipments",
															updatedSelectedEquipments
														);
													}}
												>
													X
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</FieldArray>
					{values.equipmentData.length > 0 && (
						<div>
							<div>
								<label htmlFor="remarks" className="block text-sm font-medium">
									Remarks
								</label>
								<Field
									name="remarks"
									as="textarea"
									rows="2"
									className="p-2 border border-gray-300 rounded-md w-full"
								/>
							</div>
							<h1 className="font-semibold underline text-lg">Opeaters:</h1>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
								<div>
									<label
										htmlFor="pac_dying"
										className="block text-sm font-medium text-gray-700"
									>
										PAC & Drying
									</label>
									<Field
										name="pac_dying"
										placeholder="Enter PAC & Drying"
										className="p-2 border border-gray-300 rounded-md w-full"
									/>
								</div>
								<div>
									<label
										htmlFor="sol_rec"
										className="block text-sm font-medium text-gray-700"
									>
										SOL. REC / Rovac{" "}
									</label>
									<Field
										name="sol_rec"
										placeholder="Enter SOL. REC / Rovac"
										className="p-2 border border-gray-300 rounded-md w-full"
									/>
								</div>
								<div>
									<label
										htmlFor="reaction"
										className="block text-sm font-medium text-gray-700"
									>
										REACTION{" "}
									</label>
									<Field
										name="reaction"
										placeholder="Enter REACTION  "
										className="p-2 border border-gray-300 rounded-md w-full"
									/>
								</div>
								<div>
									<label
										htmlFor="shift_manager"
										className="block text-sm font-medium text-gray-700"
									>
										PLANT SHIFT MANAGER
									</label>
									<InputSelectField
										operators={operators}
										values={values}
										setFieldValue={setFieldValue}
										id="shift_manager"
										errors={errors}
										touched={touched}
									/>
								</div>
							</div>
						</div>
					)}

					<div className="flex justify-end">
						<button
							type="submit"
							className="bg-success text-white px-4 py-2 rounded hover:bg-successDark"
						>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SealWaterAuditForm;
