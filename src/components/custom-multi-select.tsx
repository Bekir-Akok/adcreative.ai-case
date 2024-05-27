import {
  MultiSelect,
  MultiSelectProps,
  Avatar,
  Group,
  Text,
  Loader,
  Checkbox,
} from "@mantine/core";
import { FC, useState } from "react";
import { ChangeEvent, Character } from "../types/interfaces";

interface CustomMultiSelectProps
  extends Omit<
    MultiSelectProps,
    "data" | "value" | "handleChange" | "observerRef"
  > {
  data: Character[];
  value: string;
  handleChange: (evt: ChangeEvent) => void;
  observerRef: (element: HTMLElement | null) => void;
  loading: boolean;
  error?: boolean;
}

const defaultProps = {
  searchable: true,
  clearable: true,
  hidePickedOptions: true,
  maxDropdownHeight: 300,
  label: "Search your favorite character",
  nothingFoundMessage: "Oops! That character can't be found.",
};

const CustomMultiSelect: FC<CustomMultiSelectProps> = ({
  data,
  value,
  handleChange,
  observerRef,
  loading,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const convertedData = data.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));

  const filteredConvertedData = convertedData.filter(
    (convertedItem) =>
      !selectedValue.some(
        (selectedItem) => selectedItem.value === convertedItem.value
      )
  );

  const renderMultiSelectOption: MultiSelectProps["renderOption"] = ({
    option,
  }) => {
    const character = data.find((item) => item.id.toString() === option.value);
    if (!character) return null;

    const parts = character.name.split(new RegExp(`(${value})`, "gi"));
    const boldName = parts.map((part, index) =>
      part.toLowerCase() === value.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );

    const isChecked = selectedValue.some((item) => item.value === option.value);

    return (
      <div
        ref={observerRef}
        data-testid="div"
        className="w-full flex items-center gap-2 justify-between"
      >
        <Group>
          <Avatar src={character.image} size={36} radius="xl" />
          <div>
            <Text size="sm">{boldName}</Text>
            <Text size="xs" opacity={0.5}>
              {character.episode.length} Episodes
            </Text>
          </div>
        </Group>

        <Checkbox checked={isChecked} readOnly />
      </div>
    );
  };

  return (
    <MultiSelect
      {...props}
      {...defaultProps}
      data={[...selectedValue, ...filteredConvertedData]}
      filter={() => convertedData}
      renderOption={renderMultiSelectOption}
      rightSection={loading ? <Loader size="1rem" /> : null}
      searchValue={value}
      onSearchChange={(value) => {
        const evt = { value, name: "name" };
        handleChange(evt);
      }}
      onChange={(idx) => {
        const selectedCharacters = idx?.map((id) =>
          convertedData.find((char) => char.value === id)
        );

        if (selectedCharacters) {
          setSelectedValue((prevState) => {
            const newValues = selectedCharacters.filter(
              (char): char is { label: string; value: string } => !!char
            );

            const mergedValues = [...prevState, ...newValues];

            const updatedValues = mergedValues.filter((char) =>
              idx?.includes(char.value)
            );

            return updatedValues;
          });
        }

        return idx;
      }}
    />
  );
};

export default CustomMultiSelect;
