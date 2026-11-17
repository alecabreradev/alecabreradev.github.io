/**
 * Renders a text template such as "Caught {caught} of {total}" and shows each
 * value in bold. Avoids building HTML strings.
 */
export default function RichText({ template, values }) {
  const parts = template.split(/(\{\w+\})/g);
  return parts.map((part, index) => {
    const match = part.match(/^\{(\w+)\}$/);
    return match ? <strong key={index}>{values[match[1]]}</strong> : part;
  });
}
