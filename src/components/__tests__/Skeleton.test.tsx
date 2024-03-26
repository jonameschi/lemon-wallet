import { ComponentProps } from "react";
import {
  CategorySkeleton,
  FavouriteSkeleton,
  MerchantSkeleton,
  Skeleton,
} from "@components/Skeleton";
import { render } from "@testing-library/react-native";
import { MockThemeProvider } from "../../../__mocks__/MockThemeProvider";

describe("Skeleton component", () => {
  const renderTree = (props: ComponentProps<typeof Skeleton>) =>
    render(
      <MockThemeProvider>
        <Skeleton {...props} />
      </MockThemeProvider>
    );

  it("should render a snapshot - default", () => {
    const { toJSON } = renderTree({ style: { width: 100, height: 100 } });
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("MerchantSkeleton component", () => {
  const renderTree = (props: ComponentProps<typeof MerchantSkeleton>) =>
    render(
      <MockThemeProvider>
        <MerchantSkeleton {...props} />
      </MockThemeProvider>
    );

  it("should render a snapshot without multiple", () => {
    const { toJSON } = renderTree({ multiple: false });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render a snapshot with multiple", () => {
    const { toJSON } = renderTree({ multiple: true });
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("CategorySkeleton component", () => {
  const renderTree = (props: ComponentProps<typeof CategorySkeleton>) =>
    render(
      <MockThemeProvider>
        <CategorySkeleton {...props} />
      </MockThemeProvider>
    );

  it("should render a snapshot without multiple", () => {
    const { toJSON } = renderTree({ multiple: false });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render a snapshot with multiple", () => {
    const { toJSON } = renderTree({ multiple: true });
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("FavouriteSkeleton component", () => {
  const renderTree = (props: ComponentProps<typeof FavouriteSkeleton>) =>
    render(
      <MockThemeProvider>
        <FavouriteSkeleton {...props} />
      </MockThemeProvider>
    );

  it("should render a snapshot without multiple", () => {
    const { toJSON } = renderTree({ multiple: false });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render a snapshot with multiple", () => {
    const { toJSON } = renderTree({ multiple: true });
    expect(toJSON()).toMatchSnapshot();
  });
});
