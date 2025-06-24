<script lang="ts">
  import Default from "~icons/mdi/file-document";
  import HTML5 from "~icons/mdi/language-html5";
  import CSS3 from "~icons/mdi/language-css3";

  export let page: {
    name: string;
    url: string;
    ext: string;
    size: number;
  };

  let Icon;
  let filters;

  if (page.ext === "html") {
    Icon = HTML5;
    filters =
      "invert(73%) sepia(27%) saturate(813%) hue-rotate(329deg) brightness(99%) contrast(94%)";
  } else if (page.ext === "css") {
    Icon = CSS3;
    filters =
      "invert(76%) sepia(22%) saturate(7463%) hue-rotate(193deg) brightness(106%) contrast(91%)";
  } else {
    Icon = Default;
    filters =
      "invert(83%) sepia(12%) saturate(898%) hue-rotate(195deg) brightness(102%) contrast(92%)";
  }

  let convertedSize = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(page.size);
</script>

<td>
  <Icon
    class="inline-block"
    style={`filter: brightness(0) saturate(100%) ${filters};`}
  />
</td>
<td>
  <h2 class="">{page.name}</h2>
</td>
<td class="text-right">
  <span class="text-cat-subtext0">{convertedSize}</span>
</td>
