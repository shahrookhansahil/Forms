import React from "react";
import Select from "react-select";
const InputSelectField = ({
	operators,
	setFieldValue,
	values,
	id,
	errors,
	touched,
}) => {
	const operatorOptions = operators.map((operator) => ({
		value: operator,
		label: operator,
	}));

	return (
		<div>
			<Select
				id={id}
				options={operatorOptions}
				isClearable
				isSearchable
				placeholder="Enter or select a name"
				value={
					operatorOptions.find((option) => option.value === values[id]) || null
				}
				onChange={(selected) =>
					setFieldValue(id, selected ? selected.value : "")
				}
				className="w-full"
				styles={{
					control: (provided) => ({
						...provided,
						borderColor: touched[id] && errors[id] ? "red" : "gray",
						borderRadius: "0.375rem",
					}),
				}}
			/>
			{touched[id] && errors[id] && (
				<div className="text-red-500 text-sm">{errors[id]}</div>
			)}
		</div>
	);
};

export default InputSelectField;
