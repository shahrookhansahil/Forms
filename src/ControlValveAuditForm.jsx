import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useState } from "react";

const initialData = {
	revisedBy: "",
	auditDate: "",
	group: "",
	time: "",
	areas: [
		{
			name: "REACTION AREA",
			tags: [
				{
					tag: "FCV-1005",
					description: "G1-207A FLOW",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1006",
					description: "G1-207B FLOW",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1007",
					description: "G1-207C FLOW",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1101",
					description: "FEED FLOW TO D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1000",
					description: "CATLYST FLOW TO FMD",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1219",
					description: "F1-430 LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1001",
					description: "M/L FLOW TO FMD",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1113",
					description: "D1-301 LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1206",
					description: "D1-401 LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1208",
					description: "D1-402 LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1130",
					description: "BASE REFLUX TO D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1002",
					description: "WATER DRAW OFF TO D1-601",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1203",
					description: "SOLVENT DILUTION FLOW TO D1-401",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1104",
					description: "AIR FLOW TO D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1105",
					description: "AIR FLOW TO D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1106",
					description: "AIR FLOW TO D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1107",
					description: "AIR FLOW TO D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1204",
					description: "SOLVENT DILUTION FLOW TO D1-402",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1200",
					description: "AIR FLOW TO D1-401",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1237",
					description: "AIR FLOW TO D1-401",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "PCV-1218",
					description: "D1-401 PRESSURE",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "PCV-1282",
					description: "G1-407A/B K.B PRESSURE",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1035",
					description: "PTA M/L TO FMD",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1287",
					description: "D1-310 BASE LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1278",
					description: "SOLVENT FLOW TO D1-310",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1286",
					description: "D1-310 UPPER LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "LCV-1111",
					description: "E1-304 LEVEL",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "PCV-1281A/B",
					description: "D1-403 PRESSURE",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "FCV-1277",
					description: "WATER / WASTE WATER TO D1-310",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "PCV-1115A/B",
					description: "PRESSURE IN D1-301",
					dcsSignal: "",
					opening: "",
				},
				{
					tag: "PCV-1210",
					description: "D1-402 PRESSURE",
					dcsSignal: "",
					opening: "",
				},
			],
		},
	],
};

const ControlValveAuditForm = () => {
	return (
		<Formik
			initialValues={initialData}
			onSubmit={(values) => {
				console.log("Form Values:", values);
			}}
		>
			{({ values }) => (
				<Form className="p-4 space-y-6">
					{/* Form Header */}
					<div className="space-y-4">
						{/* Audit Title */}
						<h2 className="text-xl font-bold text-center">
							AUDIT OF CONTROL VALVES OPENING IN FIELD VS DCS SIGNAL
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{/* Revised By */}
							<div>
								<label
									htmlFor="revisedBy"
									className="block text-sm font-medium text-gray-700"
								>
									Revised by
								</label>
								<Field
									name="revisedBy"
									placeholder="Enter name"
									required={true}
									className="p-2 border border-gray-300 rounded-md w-full"
								/>
							</div>
							{/* Group */}
							<div>
								<label
									htmlFor="group"
									className="block text-sm font-medium text-gray-700"
								>
									Group
								</label>
								<Field
									as="select"
									name="group"
									required={true}
									className="p-2 border border-gray-300 rounded-md w-full"
								>
									<option value="" disabled>
										Select a group
									</option>
									<option value="Group A">Group A</option>
									<option value="Group B">Group B</option>
									<option value="Group C">Group C</option>
								</Field>
							</div>

							{/* Time */}
							<div>
								<label
									htmlFor="time"
									className="block text-sm font-medium text-gray-700"
								>
									Date Time
								</label>
								<Field
									name="time"
									required={true}
									type="datetime-local"
									className="p-2 border border-gray-300 rounded-md w-full"
								/>
							</div>
						</div>
					</div>

					{/* Areas */}
					<FieldArray name="areas">
						{({ remove, push }) => (
							<div className="space-y-6 bg-white">
								{values.areas.map((area, areaIndex) => (
									<div
										key={areaIndex}
										className="p-4 border border-gray-300 rounded-md shadow-md"
									>
										<div className="flex justify-between items-center">
											<h3 className="text-lg font-bold">{area.name}</h3>
										</div>
										<FieldArray name={`areas[${areaIndex}].tags`}>
											{({ push, remove: removeTag }) => (
												<div className="mt-4 space-y-4">
													{area.tags.map((tag, tagIndex) => (
														<div
															key={tagIndex}
															className="flex flex-wrap gap-4 items-center"
														>
															{tagIndex === 0 && (
																<>
																	<div className="w-full md:w-1/5">
																		<label className="block text-sm font-medium text-gray-700">
																			Tag
																		</label>
																	</div>
																	<div className="w-full md:w-1/5">
																		<label className="block text-sm font-medium text-gray-700">
																			Description
																		</label>
																	</div>
																	<div className="w-full md:w-1/5">
																		<label className="block text-sm font-medium text-gray-700">
																			DCS Signal
																		</label>
																	</div>
																	<div className="w-full md:w-1/5">
																		<label className="block text-sm font-medium text-gray-700">
																			Opening
																		</label>
																	</div>
																</>
															)}
															<div className="w-full md:w-1/5">
																<Field
																	name={`areas[${areaIndex}].tags[${tagIndex}].tag`}
																	className="p-2 border border-gray-300 rounded-md w-full"
																	disabled
																/>
															</div>
															<div className="w-full md:w-1/5">
																<Field
																	name={`areas[${areaIndex}].tags[${tagIndex}].description`}
																	required={true}
																	className="p-2 border border-gray-300 rounded-md w-full"
																/>
															</div>
															<div className="w-full md:w-1/5">
																<Field
																	name={`areas[${areaIndex}].tags[${tagIndex}].dcsSignal`}
																	required={true}
																	className="p-2 border border-gray-300 rounded-md w-full"
																/>
															</div>
															<div className="w-full md:w-1/5">
																<Field
																	name={`areas[${areaIndex}].tags[${tagIndex}].opening`}
																	required={true}
																	className="p-2 border border-gray-300 rounded-md w-full"
																/>
															</div>
															<div className="flex items-center space-x-4">
																<button
																	type="button"
																	onClick={() => removeTag(tagIndex)}
																	className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
																>
																	Remove Tag
																</button>
															</div>
														</div>
													))}
													<div className="mt-4 flex justify-between">
														<button
															type="button"
															onClick={() =>
																push({
																	tag: "",
																	description: "",
																	dcsSignal: "",
																	opening: "",
																})
															}
															className="bg-blue-500 text-white px-4 py-2 rounded-md"
														>
															Add Tag
														</button>
													</div>
												</div>
											)}
										</FieldArray>
									</div>
								))}
							</div>
						)}
					</FieldArray>

					{/* Submit Button */}
					<div className="flex justify-center mt-8">
						<button
							type="submit"
							className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
						>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ControlValveAuditForm;
