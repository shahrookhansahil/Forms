import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { safetyShowersData } from "./fakeData";

export default function SafetyForm() {
	const validationSchema = Yup.object({
		safetyShowers: Yup.array().of(
			Yup.object().shape({
				location: Yup.string().required("Required"),
				no: Yup.number()
					.required("Required")
					.min(1, "At least one is required"),
				leakage: Yup.boolean(),
				bulbOk: Yup.boolean(),
				pressureOk: Yup.boolean(),
			})
		),
		fireExtinguishers: Yup.array().of(
			Yup.object().shape({
				location: Yup.string().required("Required"),
				pressureOk: Yup.boolean(),
				boxOk: Yup.boolean(),
			})
		),
		escapeSets: Yup.array().of(
			Yup.object().shape({
				location: Yup.string().required("Required"),
				pressureOk: Yup.boolean(),
				boxOk: Yup.boolean(),
			})
		),
		spillControl: Yup.object({
			wheelBarrowOk: Yup.boolean(),
			sandBagsPresent: Yup.boolean(),
			shovelPresent: Yup.boolean(),
			qualityOfSand: Yup.string().required("Required"),
			remarks: Yup.string(),
		}),
	});

	return (
		<Formik
			initialValues={{
				group: "",
				shift: "",
				date: "",
				safetyShowers: safetyShowersData.safetyShowers,
				fireExtinguishers: safetyShowersData.fireExtinguishers,
				escapeSets: safetyShowersData.escapeSets,
				spillControl: {
					wheelBarrowOk: false,
					sandBagsPresent: false,
					shovelPresent: false,
					qualityOfSand: "",
					remarks: "",
				},
			}}
			// validaqualityOfSandtionSchema={validationSchema}
			onSubmit={(values) => {
				console.log("Form Values:", values);
			}}
		>
			{({ values }) => (
				<div className=" p-4">
					<h2 className="text-xl font-bold text-center mb-4">
						OX Plant Safety Equipments Audit
					</h2>
					<div className="grid grid-cols-3 gap-4 mb-4">
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
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Date & Time
							</label>
							<Field
								name="date"
								type="date"
								className="p-1 border border-gray-300 rounded-md w-full"
							/>
						</div>
					</div>
					<Form>
						<div className="grid grid-cols-11 ">
							<div className="col-span-5 border-x border-gray-300">
								<div className="bg-[#92D050]  px-2 mb-2">
									<h2 className="text-xl font-semibold   text-center">
										Safety Showers
									</h2>
									<div className="grid grid-cols-6 gap-4 my-2 font-semibold">
										<div className="col-span-2 ">Location</div>
										<div>No</div>
										<div>Leakage</div>
										<div>Bulb OK</div>
										<div>Pressure OK</div>
									</div>
								</div>

								<FieldArray name="safetyShowers">
									{({ remove, push }) => (
										<>
											{values.safetyShowers.map((_, index) => (
												<div
													key={index}
													className="grid grid-cols-6 gap-4 mb-4 pl-2"
												>
													<Field
														name={`safetyShowers.${index}.location`}
														placeholder="Location"
														className="col-span-2 border rounded p-1"
														disabled={true}
													/>
													<Field
														name={`safetyShowers.${index}.no`}
														placeholder="No"
														type="number"
														className="border rounded p-1"
														disabled={true}
													/>
													<Field
														type="checkbox"
														name={`safetyShowers.${index}.leakage`}
														className="border rounded w-6 "
													/>

													<Field
														type="checkbox"
														name={`safetyShowers.${index}.bulbOk`}
														className="border rounded w-6 "
													/>
													<Field
														type="checkbox"
														name={`safetyShowers.${index}.pressureOk`}
														className="border rounded w-6 "
													/>
												</div>
											))}
										</>
									)}
								</FieldArray>
							</div>
							<div className="col-span-3 ">
								<div className="bg-danger  px-2 mb-2 text-white">
									<h2 className="text-xl font-semibold   text-center">
										Fire Extinguishers
									</h2>
									<div className="grid grid-cols-4 gap-4 my-2 font-semibold">
										<div className="col-span-2 ">Location</div>
										<div>Pressure OK</div>
										<div>Box OK</div>
									</div>
								</div>
								<FieldArray name="fireExtinguishers">
									{({ remove, push }) => (
										<>
											{values.fireExtinguishers.map((_, index) => (
												<div
													key={index}
													className="grid grid-cols-4 gap-4 mb-4 pl-2"
												>
													<Field
														name={`fireExtinguishers.${index}.location`}
														placeholder="Location"
														className="col-span-2 border rounded p-1"
														disabled={true}
													/>
													<Field
														type="checkbox"
														name={`fireExtinguishers.${index}.pressureOk`}
														className="border rounded w-6 "
													/>
													<Field
														type="checkbox"
														name={`fireExtinguishers.${index}.boxOk`}
														className="border rounded w-6 "
													/>
												</div>
											))}
										</>
									)}
								</FieldArray>
							</div>
							<div className="col-span-3 border-x border-gray-300">
								<div className="bg-[#FFC000]  px-2 mb-2">
									<h2 className="text-xl font-semibold  text-center">
										Escape Sets
									</h2>
									<div className="grid grid-cols-4 gap-4 my-2 font-semibold">
										<div className="col-span-2 ">Location</div>
										<div>Pressure OK</div>
										<div>Box OK</div>
									</div>
								</div>
								<FieldArray name="escapeSets">
									{({ remove, push }) => (
										<>
											{values.escapeSets.map((_, index) => (
												<div
													key={index}
													className="grid grid-cols-4 gap-4 mb-4 pl-2"
												>
													<Field
														name={`escapeSets.${index}.location`}
														placeholder="Location"
														className="col-span-2 border rounded p-1"
														disabled={true}
													/>
													<Field
														type="checkbox"
														name={`escapeSets.${index}.pressureOk`}
														className="border rounded w-6 "
													/>
													<Field
														type="checkbox"
														name={`escapeSets.${index}.boxOk`}
														className="border rounded w-6 "
													/>
												</div>
											))}
										</>
									)}
								</FieldArray>
							</div>
						</div>

						<div className="w-full border-t border-gray-400 mt-12">
							<h3 className="text-xl font-semibold mb-4">
								Spill Control Station Audit
							</h3>
							<div className="grid grid-cols-6 gap-4">
								<div className="flex flex-col">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Wheel Barrow OK?
									</label>
									<Field
										name="spillControl.wheelBarrowOk"
										type="checkbox"
										className="w-6 h-6 "
									/>
								</div>
								<div className="flex flex-col">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Sand Bags Present?
									</label>
									<Field
										name="spillControl.sandBagsPresent"
										type="checkbox"
										className="w-6 h-6 "
									/>
								</div>
								<div className="flex flex-col">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Shovel Present?
									</label>
									<Field
										name="spillControl.shovelPresent"
										type="checkbox"
										className="w-6 h-6 "
									/>
								</div>
								<div className="flex flex-col">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Quality of Sand
									</label>
									<Field
										as="select"
										name="spillControl.sandQuality"
										className="p-2 border border-gray-300 rounded-md w-full"
									>
										<option value="default">Select Sand Quality</option>
										<option value="wet">Wet</option>
										<option value="dry">Dry</option>
										<option value="hard">Hard</option>
										<option value="soft">Soft</option>
									</Field>
								</div>
								<div className="flex flex-col col-span-2">
									<label className="block text-sm font-medium text-gray-700">
										Other Remarks
									</label>
									<Field
										name="spillControl.otherRemarks"
										as="textarea"
										className=" border border-gray-300 rounded-md w-full"
									/>
								</div>
							</div>
						</div>

						<div className="flex justify-end mt-6">
							<button
								type="submit"
								className="bg-success text-white px-6 py-3 rounded hover:bg-successDark"
							>
								Submit
							</button>
						</div>
					</Form>
				</div>
			)}
		</Formik>
	);
}
