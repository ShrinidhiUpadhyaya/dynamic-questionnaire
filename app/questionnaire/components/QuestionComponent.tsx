import { BaseQuestionProps, ComponentRegistry } from "@/types/common";

import InvalidComponent from "./InvalidComponent";

export function QuestionComponent<T extends string>({
  components,
}: {
  components: ComponentRegistry<T>;
}) {
  return function WrappedQuestionComponent({
    question,
    answer,
    onChange,
    ...props
  }: BaseQuestionProps<T>) {
    const Component = components[question.sub_type];

    if (!Component) {
      return <InvalidComponent type={question.sub_type} supportedTypes={Object.keys(components)} />;
    }

    return (
      <Component options={question.options} defaultValue={answer} onChange={onChange} {...props} />
    );
  };
}
