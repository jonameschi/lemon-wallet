import { FC, useCallback, useRef, useState } from 'react';
import { Pressable, TextInput, View, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { theme as themeColor } from 'theme/theme';
import { Row } from './Row';
import CloseIcon from '../../assets/icons/close.svg';
import SearchIcon from '../../assets/icons/search.svg';

const WrapperSearch = styled(View)`
  border-color: ${({ theme }) => theme.line.primary};
  border-width: 1px;
  border-left-width: 0;
  border-top-right-radius: 36px;
  border-bottom-right-radius: 36px;
  padding: 10px;
  padding-left: 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  flex: 1;
`;

const InputStyled = styled(TextInput)`
  font-size: 16px;
  flex: 1;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
`;

type SearchTextProps = {
  onChangeText: (text: string) => void;
  initialValue?: string;
  placeholder?: string;
} & Pick<ViewProps, 'testID'>;

const SearchText: FC<SearchTextProps> = ({
  initialValue,
  onChangeText,
  placeholder,
  testID,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChangeText(newValue);
    },
    [onChangeText],
  );

  const handleClear = useCallback(() => {
    inputRef.current?.clear();
    handleChange('');
  }, [handleChange]);

  return (
    <WrapperSearch>
      <Row alignItems="center" gap={8}>
        <SearchIcon fill={themeColor.text.tertiary} height={24} width={24} />
        <InputStyled
          ref={inputRef}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={themeColor.text.tertiary}
          testID={`${testID}-input`}
          value={value}
          onChangeText={handleChange}
        />
        {value && (
          <Pressable testID={`${testID}-clear-btn`} onPress={handleClear}>
            <CloseIcon fill={themeColor.text.tertiary} height={24} width={24} />
          </Pressable>
        )}
      </Row>
    </WrapperSearch>
  );
};

export { SearchText };
