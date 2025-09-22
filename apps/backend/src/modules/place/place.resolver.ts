import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Place } from './entities/place.entity';
import { PlaceService } from './place.service';
import { PlaceFilterInput } from './dto/place-filters.input';
import { SignedUploadPayload } from '@caffee/types';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class SignedUpload implements SignedUploadPayload {
  @Field()
  uploadUrl: string;

  @Field()
  assetUrl: string;

  @Field({ nullable: true })
  expiresAt: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  fields?: Record<string, string>;
}

@Resolver(() => Place)
export class PlaceResolver {
  constructor(private readonly placeService: PlaceService) {}

  @Query(() => [Place], { name: 'places' })
  searchPlaces(@Args('filters', { type: () => PlaceFilterInput, nullable: true }) filters?: PlaceFilterInput) {
    return this.placeService.search(filters ?? {});
  }

  @Query(() => Place, { name: 'place' })
  getPlace(@Args('id') id: string) {
    return this.placeService.findOne(id);
  }

  @Mutation(() => SignedUpload)
  createUpload(@Args('fileName') fileName: string, @Args('contentType') contentType: string) {
    const assetUrl = `https://cdn.example.com/${Date.now()}-${fileName}`;
    return {
      uploadUrl: 'https://s3.localhost/upload',
      assetUrl,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      fields: {
        'Content-Type': contentType
      }
    };
  }
}
