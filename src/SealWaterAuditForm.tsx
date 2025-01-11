import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import InputSelectField from "./InputSelectField.tsx";
import { operators, equipmentWaterSupplyData } from "./fakeData";
import Select from "react-select";

const equipmentData = equipmentWaterSupplyData.map((equipment) => ({
	serialNo: equipment.serialNo,
	equipmentNo: equipment.equipmentNo,
	inletFlow: equipment.inletFlow,
	outletFlow: equipment.outletFlow,
	kgInlet: "",
	kgOutlet: "",
	remarks: "",
}));
const SealWaterAuditForm = () => {
	const equipmentOptions = equipmentData.map((equipment) => ({
		value: equipment.serialNo,
		label: `${equipment.equipmentNo}`,
	}));

	return (
		<Formik
			initialValues={{
				preparedBy: "",
				reviewedBy: "",
				date: "",
				revisionDate: "",
				selectedEquipments: [],
				equipmentData: [],
			}}
			onSubmit={(values) => {
				console.log("Form Values:", values);
			}}
		>
			{({ values, errors, touched, setFieldValue }) => (
				<Form className="p-4 space-y-6">
					<div className="space-y-4 border-b-2 border-gray-200 pb-8">
						<h2 className="text-xl font-bold text-center">
							Pumps and Agitators Seal Water Supply / Return Flow Audit
						</h2>
						<div className="grid grid-cols-3 gap-4">
							<div>
								<label
									htmlFor="preparedBy"
									className="block text-sm font-medium text-gray-700"
								>
									Prepared By
								</label>
								<InputSelectField
									operators={operators}
									values={values}
									id="preparedBy"
									setFieldValue={setFieldValue}
									errors={errors}
									touched={touched}
								/>
								{touched.preparedBy && errors.preparedBy && (
									<div className="text-danger text-sm">{errors.preparedBy}</div>
								)}
							</div>
							<div>
								<label
									htmlFor="reviewedBy"
									className="block text-sm font-medium text-gray-700"
								>
									Reviewed By
								</label>
								<InputSelectField
									operators={operators}
									values={values}
									id="reviewedBy"
									setFieldValue={setFieldValue}
									errors={errors}
									touched={touched}
								/>
								{touched.reviewedBy && errors.reviewedBy && (
									<div className="text-danger text-sm">{errors.reviewedBy}</div>
								)}
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Date
								</label>
								<Field
									name="date"
									type="date"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.date && errors.date && (
									<div className="text-danger text-sm">
										{typeof errors.date === "string" && errors.date}
									</div>
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
										<div className="grid grid-cols-8 gap-4 mt-4">
											{index === 0 && (
												<>
													<div>
														<label
															htmlFor={`equipmentData[${index}].serialNo`}
															className="block text-sm font-medium text-gray-700 mb-7"
														>
															S. No.
														</label>
													</div>
													<div>
														<label
															htmlFor={`equipmentData[${index}].equipmentNo`}
															className="block text-sm font-medium text-gray-700 mb-7"
														>
															Equipment No.
														</label>
													</div>
													<div className="col-span-2 border-x border-gray-300 px-2">
														<label
															htmlFor={`equipmentData[${index}].tagNo`}
															className="block text-sm font-medium text-gray-700 text-center"
														>
															FG’s Tag No. / FG’s Factor
														</label>
														<div className="grid grid-cols-2 gap-4 mt-2">
															<div>
																<label
																	htmlFor={`equipmentData[${index}].inletFlow`}
																	className="block text-sm font-medium text-gray-700"
																>
																	Inlet Flow
																</label>
															</div>
															<div>
																<label
																	htmlFor={`equipmentData[${index}].outletFlow`}
																	className="block text-sm font-medium text-gray-700"
																>
																	Outlet Flow
																</label>
															</div>
														</div>
													</div>

													<div>
														<label
															htmlFor={`equipmentData[${index}].kgInlet`}
															className="block text-sm font-medium text-gray-700 mb-7"
														>
															Kg/hr (Inlet)
														</label>
													</div>
													<div>
														<label
															htmlFor={`equipmentData[${index}].kgOutlet`}
															className="block text-sm font-medium text-gray-700 mb-7"
														>
															Kg/hr (Outlet)
														</label>
													</div>
													<div className="col-span-2">
														<label
															htmlFor={`equipmentData[${index}].remarks`}
															className="block text-sm font-medium text-gray-700 mb-7"
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
											<div className="col-span-2">
												<div className="grid grid-cols-2 gap-4 mt-2">
													<div>
														<Field
															name={`equipmentData[${index}].inletFlow`}
															placeholder="Enter Inlet Flow"
															className="p-2 border border-gray-300 rounded-md w-full mt-[-1vh]"
														/>
													</div>
													<div>
														<Field
															name={`equipmentData[${index}].outletFlow`}
															placeholder="Enter Outlet Flow"
															className="p-2 border border-gray-300 rounded-md w-full mt-[-1vh]"
														/>
													</div>
												</div>
											</div>
											<div>
												<Field
													name={`equipmentData[${index}].kgInlet`}
													placeholder="Enter Kg/hr (Inlet)"
													className="p-2 border border-gray-300 rounded-md w-full"
												/>
											</div>
											<div>
												<Field
													name={`equipmentData[${index}].kgOutlet`}
													placeholder="Enter Kg/hr (Outlet)"
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
							<label
								htmlFor="shift_manager"
								className="block text-sm font-medium text-gray-700"
							>
								SSM Signature
							</label>
							<InputSelectField
								operators={operators}
								values={values}
								setFieldValue={setFieldValue}
								id="ssm_signature"
								errors={errors}
								touched={touched}
							/>
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
