<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WordIndexResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      return [
        'id' => $this->id,
        'name' => $this->name,
        'definition' => $this->definition,
        'memo' => $this->memo,
        'url' => $this->url,
        'categoryId' => $this->category_id
      ];
    }
}
